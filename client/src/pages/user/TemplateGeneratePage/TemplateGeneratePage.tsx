import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";
import { templateMapForCapture } from "@components/template/templateMapping";

export default function TemplateGeneratePage() {
  const { templateName } = useParams();
  const TemplateToRender = templateMapForCapture[templateName as string];

  return <TemplateToRender />;
}
