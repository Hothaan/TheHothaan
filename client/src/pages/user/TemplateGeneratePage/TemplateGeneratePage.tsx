import { useParams } from "react-router-dom";
import { templateMap } from "@components/template/templateMapping";

export default function TemplateGeneratePage() {
  const { templateName, data } = useParams();
  const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  const TemplateToRender = templateMap[templateName as string];

  console.log("templateMap:", templateMap);
  console.log("templateName:", templateName);

  return (
    <div>
      {/* <TemplateToRender data={data} /> */}
      <TemplateToRender />
    </div>
  );
}
