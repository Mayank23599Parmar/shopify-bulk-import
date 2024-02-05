import shopify from "../shopify.js";

export const CreateStagedUploads =async(payload,session)=>{
    const client = new shopify.api.clients.Graphql({ session });
    const generateUploadUrl = await client.query({
        data: {
          query:STAGED_UPLOADS_CREATE,
          variables:{
            ...payload
          }
        },
      });
      const stagedTargets=generateUploadUrl?.body?.data?.stagedUploadsCreate?.stagedTargets
      const error=generateUploadUrl?.body?.data?.stagedUploadsCreate?.userErrors || []
      return { error,stagedTargets }
      
}

const STAGED_UPLOADS_CREATE = `
mutation GenerateImageUploadURL($filename: String!, $fileSize: UnsignedInt64, $mimeType: String!) {
  stagedUploadsCreate(
    input: {resource: BULK_MUTATION_VARIABLES, mimeType:$mimeType, httpMethod: POST, filename: $filename, fileSize: $fileSize}
  ) {
    stagedTargets {
      parameters {
        name
        value
      }
      resourceUrl
      url
    }
    userErrors {
      field
      message
    }
  }
}
`;