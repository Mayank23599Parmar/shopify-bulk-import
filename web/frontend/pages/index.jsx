import { Button, DropZone, Frame, Layout, LegacyCard, LegacyStack, Page, PageActions, Spinner, Text, Toast, } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import {
  useAuthenticatedFetch
} from '@shopify/app-bridge-react';
function HomePage() {
  const [file, setFile] = useState(null);
  const [xlsfileLoader, setXlsFileLoader] = useState(false);
  const [xlsfile, setXlsFile] = useState(null);
  const [stagedUploadPath, setStagedUploadPath] = useState(null)
  const [fileLoader, setFileLoader] = useState(false)
  const [submitLoaderBtn, setSubmitLoaderBtn] = useState(false)
  const authFetch = useAuthenticatedFetch();
  const [toast, setToast] = useState({ active: false, message: "" })
  const toggleActive = useCallback(() => setToast(() => !toast.active), []);
  const showToastMessage = (data) => {
    const { isError } = data
    setToast({
      active: true,
      message: isError ? "Something went wrong" : "Data imported successfully"
    })
  }
  const uploadCSVFile = async (_dropFiles, _rejectedFiles) => {
    try {
      setXlsFileLoader(true)
      const uploadedFile = _dropFiles[0]
      const formData = new FormData()
      formData.append("file", uploadedFile)
      const response = await authFetch(`/api/v1/upload-excel`, {
        method: "POST",
        body: formData
      });
      setXlsFile(uploadedFile)
    } catch (error) {
      console.log(error)
    } finally {
      
      setXlsFileLoader(false)
    }
  }
  const handleDropZoneDrop = async (_dropFiles, _rejectedFiles) => {
    try {
      setFileLoader(true)
      const uploadedFile = _dropFiles[0]
      const data = {
        filename: uploadedFile.name,
        mimeType: "text/jsonl",
        fileSize: `${uploadedFile.size}`
      }
      const response = await authFetch(`/api/v1/upload-jsonl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const result = await response.json()

      if (result?.sucsess) {
        const stagedTargets = result?.stagedTargets
        if (stagedTargets) {

          const [{ url, parameters }] = stagedTargets

          const formData = new FormData()
          let key = ""
          parameters.forEach(({ name, value }) => {
            if (name == "key") {
              key = value
            }
            formData.append(name, value)
          })
          formData.append('file', uploadedFile)
          const upload = await authFetch(url, {
            method: "POST",
            body: formData,
          });
          if (upload?.ok) {
            setFileLoader(false)
            setStagedUploadPath(key)
          } else {
            showToastMessage({ isError: true })
          }
        }
      } else {
        setFileLoader(false)
        showToastMessage({ isError: true })
      }
      setFile(uploadedFile)
    } catch (error) {
      setFileLoader(false)
      console.log(error)
    }
  }
  const importDataToShopify = async () => {
    try {
      setSubmitLoaderBtn(true)
      const response = await authFetch(`/api/v1/import`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stagedUploadPath: stagedUploadPath
        })
      });
      const result = await response.json()
      if (result?.success) {
        if (result?.message?.status == "CREATED") {
          showToastMessage({ isError: false })
        } else {
          showToastMessage({ isError: true })
        }
      } else {
        showToastMessage({ isError: true })
      }
    } catch (error) {
      console.log(error)
      showToastMessage({ isError: true })
    } finally {
      setSubmitLoaderBtn(false)
      setFile(null)
      setXlsFile(null)
    }
  }
  const toastMarkup = toast.active ? (
    <Toast content={toast.message} onDismiss={toggleActive} />
  ) : null;
  const fileUpload = !file && (
    <DropZone.FileUpload actionHint="Accepts .jsonl" />
  );
  const uploadedFiles = file && (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
      <LegacyStack vertical style={{ textAlign: "center" }}>
        <LegacyStack alignment="center" >
          <Text variant="bodySm" as="p">
            {file.name}{' '} Uploaded
          </Text>
        </LegacyStack>
      </LegacyStack>
    </div>
  );
  const uploadedXlsFiles = xlsfile && (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
      <LegacyStack vertical style={{ textAlign: "center" }}>
        <LegacyStack alignment="center" >
          <Text variant="bodySm" as="p">
            {xlsfile.name}{' '} Uploaded
          </Text>
        </LegacyStack>
      </LegacyStack>
    </div>
  );
  return (
    <div className='home-page'>
      <Page>
        <Frame>
          <PageActions
            primaryAction={{
              content: 'Import to Shopify',
              loading: submitLoaderBtn,
              disabled: !file ? true : false,
              onAction: function () {
                importDataToShopify()
              }
            }}
          />
          <Layout>
            <Layout.Section>
              <LegacyCard title="Upload csv  File" sectioned>
                <DropZone
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  type="text"
                  errorOverlayText="File type must be .csv"
                  allowMultiple={false} onDrop={uploadCSVFile}>
                  {
                    xlsfileLoader && <Spinner />
                  }
                  {uploadedXlsFiles}
                </DropZone>
              </LegacyCard>
            </Layout.Section>
            <Layout.Section>
              <LegacyCard title="Upload .jsonl File" sectioned>
                <DropZone
                  accept="text/jsonl"
                  type="text"
                  errorOverlayText="File type must be .jsonl"

                  allowMultiple={false} onDrop={handleDropZoneDrop}>
                  {
                    fileLoader && <Spinner />
                  }
                  {uploadedFiles}
                  {fileUpload}

                </DropZone>
              </LegacyCard>
            </Layout.Section>
          </Layout>
          {toastMarkup}
        </Frame>
      </Page>
    </div>
  );
}
export default HomePage