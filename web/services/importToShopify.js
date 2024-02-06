import shopify from "../shopify.js";

export const importToShopify=async(payload,session)=>{
    const client = new shopify.api.clients.Graphql({ session });
   
    const   variables={
        mutation:CREATE_CUSTOMER,
        ...payload
      }
      //swsw
    const importUploadedData = await client.query({
        data: {
          query:BULK_MUTATION_QUERY,
          variables
        },
      });
      const errors=importUploadedData?.body?.data?.bulkOperationRunMutation?.userErrors
      const bulkOperation=importUploadedData?.body?.data?.bulkOperationRunMutation?.bulkOperation
      if(errors?.length > 0){
        return {
          success:false,
          message:errors
        }
      }else{
        return {
          success:true,
          message:bulkOperation
        }
      }
}
//wdw
const BULK_MUTATION_QUERY=`mutation MyMutation($stagedUploadPath: String!, $mutation: String!) {
    bulkOperationRunMutation(
      mutation: $mutation
      stagedUploadPath: $stagedUploadPath
    ) {
      bulkOperation {
        completedAt
        createdAt
        errorCode
        fileSize
        id
        objectCount
        partialDataUrl
        query
        rootObjectCount
        status
        type
        url
      }
      userErrors {
        code
        field
        message
      }
    }
  }
  `
  const CREATE_CUSTOMER=`
  mutation CreateCustomer($input:CustomerInput!) {
    customerCreate(input:$input) {
      customer {
        email
        firstName
      }
      userErrors {
        field
        message
      }
    }
  }
  `