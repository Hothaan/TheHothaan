/** @jsxImportSource @emotion/react */

export interface Istructure {
  title?: string;
  navigation?: string[];
}

export const structure = `{ title: string; navigation: string[]; }`;

export default function Header(props: Istructure) {
  if (!props.title && !props.navigation) {
    return <div>please fetch data</div>;
  }

  return (
    <header>
      <h1>{props.title || "loading"}</h1>
      <nav>
        <ul>
          {props.navigation
            ? props.navigation.map((item) => <li key={item}>{item}</li>)
            : "loading"}
        </ul>
      </nav>
    </header>
  );
}
