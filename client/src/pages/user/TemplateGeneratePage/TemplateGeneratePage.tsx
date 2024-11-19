import { useParams } from "react-router-dom";
import { templateMap } from "@components/template/templateMapping";

export default function TemplateGeneratePage() {
  const { templateName } = useParams<{ templateName: string }>();
  const TemplateToRender = templateMap[templateName as string];

  return (
    <div>
      <TemplateToRender />
    </div>
  );
}
