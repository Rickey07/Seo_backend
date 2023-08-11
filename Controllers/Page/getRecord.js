const { ResponseHandler } = require("../../Utils/ResponseHandler");
const Page = require("../../Models/Page/Page");

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
  try {
    const body = req.body;
    const updateOrCreate = req.query.update;
    const idForUpdation = req.query.pageId;

    // Basic Sanity Checks
    if (Object.keys(body).length === 0)
      return ResponseHandler(res, false, 400, "Please Specify Some Content");
    if (updateOrCreate === undefined)
      return ResponseHandler(
        res,
        false,
        400,
        "Please Specify Whether to update or create a new record"
      );

    let checker = updateOrCreate === "false" ? false : true
    // If For Update Then Run API For update or else for new Record
    const result = checker ? (await Page.findByIdAndUpdate(idForUpdation, body, { new: true })) :  (await new Page(body).save())
    return ResponseHandler(res, true, 200, "Updated Successfully",result);
    
  } catch (error) {
    return ResponseHandler(res, false, 500, "Unknown Error Code occurred");
  }
};
