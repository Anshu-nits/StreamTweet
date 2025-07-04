import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
  incrementView
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();         
router.use(verifyJWT);   

router.route("/").get(getAllVideos)

router.route("/").post(
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    publishAVideo
);

router.route("/:videoId").get(getVideoById)

router.route("/:videoId").delete(deleteVideo)

router.route("/:videoId").patch(upload.single("thumbnail"), updateVideo);   

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

router.route("/incrView/:videoId").patch(incrementView)

export default router;