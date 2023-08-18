const { ResponseHandler } = require("../../Utils/ResponseHandler");
const Page = require("../../Models/Page/Page");
const axios = require('axios')

exports.getPage = async (req, res) => {
  try {
    const result = await Page.find({});
    return ResponseHandler(
      res,
      true,
      200,
      "Records Fetched Successfully",
      result
    );
  } catch (error) {
    return ResponseHandler(res, false, 500, "Unknown Error Code occurred");
  }
};

exports.newPage = async (req, res) => {

  const REPO_OWNER = "ControlShiftDev"
  const REPO_NAME = "NewControlshiftWeb"
  const PAT = "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"
  const FILE_PATH = "Frontend/public/index.html"

  try {
    const {title,description,twitter_desc,twitter_title} = req.body

    // Get the File From Github
      const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: {
        Authorization: `Bearer ${PAT}`
      }
    });

    const fileData = response.data;

    // Current HTML content as string
    const currentContent = Buffer.from(fileData.content, 'base64').toString();
    let updatedContent = currentContent
    if(title) {
       const titleRegex = /<title>[\s\S]*<\/title>/i;
      updatedContent = updatedContent.replace(titleRegex, `<title>${title}</title>`);
    }

    if(description) {
      updatedContent = updatedContent.replace(
        /<meta name="description" content="[^"]*"/i,
        `<meta name="description" content="${description}"`
      );
    }

     if(twitter_desc) {
      updatedContent = updatedContent.replace(
        /<meta name="twitter:description" content="[^"]*"/i,
        `<meta name="twitter:description" content="${twitter_desc}"`
      );
    }

    if(twitter_title) {
      updatedContent = updatedContent.replace(
        /<meta name="twitter:title" content="[^"]*"/i,
        `<meta name="twitter:title" content="${twitter_title}"`
      );
    }

    const updateResponse = await axios.put(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      message:"Update Index.html using CMS",
      content:Buffer.from(updatedContent)?.toString('base64'),
      sha:fileData.sha
    },{
      headers: {
        Authorization: `Bearer ${PAT}`,
      },
    }
    );
  if(updateResponse?.status===200 || updateResponse?.status === 201) {
    return ResponseHandler(res,true,200,"Successfully updated Please wait 5 minutes for deployment",req.body)
  }

  } catch (error) {
    return ResponseHandler(res,false,400,"Unknown Error Occured While Updating Data Please contact tech team ",error)
  }


  // If later want to maintain blog -- comment the below code

  // try {
  //   const body = req.body;
  //   const updateOrCreate = req.query.update;
  //   const idForUpdation = req.query.pageId;

  //   // Basic Sanity Checks
  //   if (Object.keys(body).length === 0)
  //     return ResponseHandler(res, false, 400, "Please Specify Some Content");
  //   if (updateOrCreate === undefined)
  //     return ResponseHandler(
  //       res,
  //       false,
  //       400,
  //       "Please Specify Whether to update or create a new record"
  //     );

  //   let checker = updateOrCreate === "false" ? false : true
  //   // If For Update Then Run API For update or else for new Record
  //   const result = checker ? (await Page.findByIdAndUpdate(idForUpdation, body, { new: true })) :  (await new Page(body).save())
  //   return ResponseHandler(res, true, 200, "Updated Successfully",result);
    
  // } catch (error) {
  //   return ResponseHandler(res, false, 500, "Unknown Error Code occurred");
  // }
};
