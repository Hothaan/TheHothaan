import { useParams } from "react-router-dom";
import { templateMapForCapture } from "@components/template/templateMapping";

export default function TemplateGeneratePage() {
  const { templateName } = useParams();
  const TemplateToRender = templateMapForCapture[templateName as string];

  return <TemplateToRender />;
}
