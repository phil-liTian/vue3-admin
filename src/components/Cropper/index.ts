
import { withInstall } from "@/utils";
import cropperAvatar from "./src/CropperAvatar.vue";
import cropper from "./src/Cropper.vue";

export const CropperAvatar = withInstall(cropperAvatar);
export const CropperImage = withInstall(cropper);
