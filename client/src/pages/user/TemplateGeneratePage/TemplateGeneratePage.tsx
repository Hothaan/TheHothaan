import { useParams } from "react-router-dom";
import { templateMapForCapture } from "@components/template/templateForCaptureMapping";

export default function TemplateGeneratePage() {
  const { templateName, data } = useParams();
  const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  const TemplateToRender = templateMapForCapture[templateName as string];

  console.log("templateMapForCapture:", templateMapForCapture);
  console.log("templateName:", templateName);

  return (
    <div>
      {/* <TemplateToRender data={data} /> */}
      <TemplateToRender />
    </div>
  );
}
