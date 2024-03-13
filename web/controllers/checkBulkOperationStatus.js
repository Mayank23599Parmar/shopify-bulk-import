import shopify from "../shopify.js";
const BULK_MUTATION_QUERY_STATUS=`query MyQuery {
    currentBulkOperation(type: MUTATION) {
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
      url
      type
    }
  }`
export const checkBulkOperationStatus=async(req,res)=>{
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });
    const status = await client.query({
        data: {
          query:BULK_MUTATION_QUERY_STATUS,
        },
      });
      if(status.data){
        res.status(200).json(status.data)
    }else{
        res.status(500).json(data)  
    }
}