import PageTitle from "../PageTitle";
import PageTitleWrapper from "../PageTitleWrapper";
interface HeaderBarProps {
    title: string,
    subHeader?: string
}

export default function HeaderBar(props: HeaderBarProps) {
  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading={props.title}
          subHeading={props.subHeader}
        />
      </PageTitleWrapper>
    </>
  );
}
