import { JSONContent } from "novel";
import Editor from "./editor/advanced-editor";

export default function MainEditor({
  value,
  setValue,
}: {
  value: JSONContent;
  setValue: React.Dispatch<React.SetStateAction<JSONContent>>;
}) {
  return (
    <main>
      <Editor initialValue={value} onChange={setValue} />
    </main>
  );
}
