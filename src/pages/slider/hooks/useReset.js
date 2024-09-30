import { detailBanner } from "@/shared/modules/banner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useReset = ({
  form,
  setFileListuz,
  setFileListru,
  setMFileListuz,
  setMFileListru,
  setValue,
}) => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["get-banner-detail"],
    queryFn: () => detailBanner(id),
    select: (res) => res?.data,
    onSuccess: (res) => {
      if (res?.media_uz) {
        setFileListuz([{ url: res?.media_uz }]);
      }
      if (res?.media_ru) {
        setFileListru([{ url: res?.media_ru }]);
      }
      if (res?.mobile_media_uz) {
        setMFileListuz([{ url: res?.mobile_media_uz }]);
      }
      if (res?.mobile_media_ru) {
        setMFileListru([{ url: res?.mobile_media_ru }]);
      }
      // if (res.have_button) {
      //   setValue(1);
      // } else {
      //   setValue(0);
      // }
      return form.reset(res);
    },
    enabled: id ? true : false,
  });
};
