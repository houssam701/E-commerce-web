import SectionPageComponent from "@/components/SectionPage";

export default async function SectionPage({params}) {
    const section = (await params).section;
    return <>
        <SectionPageComponent section={section} />
    </>
}