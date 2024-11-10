import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Ingredients from "@/components/ingredients";
import Macros from "@/components/macros";
import RecipeFinder from "@/components/results";

export default function IndexPage() {
  return <DefaultLayout>
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Welcome to ChefItUp</h1>
        <p className={subtitle()}>All we you need to do is let us know what ingredients you have, and we'll let tou know the best recipes you can make based on your macro perferences.</p>
      </div>
      <div className="flex flex-row gap-4">
        <Ingredients />
        <Macros />
        <RecipeFinder />
      </div>
    </section>
  </DefaultLayout>;

  // return (
  //   <DefaultLayout>
  //     <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
  //       <div className="inline-block max-w-lg text-center justify-center">
  //         <span className={title()}>Make&nbsp;</span>
  //         <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
  //         <br />
  //         <span className={title()}>
  //           websites regardless of your design experience.
  //         </span>
  //         <div className={subtitle({ class: "mt-4" })}>
  //           Beautiful, fast and modern React UI library.
  //         </div>
  //       </div>

  //       <div className="flex gap-3">
  //         <Link
  //           isExternal
  //           className={buttonStyles({
  //             color: "primary",
  //             radius: "full",
  //             variant: "shadow",
  //           })}
  //           href={siteConfig.links.docs}
  //         >
  //           Documentation
  //         </Link>
  //         <Link
  //           isExternal
  //           className={buttonStyles({ variant: "bordered", radius: "full" })}
  //           href={siteConfig.links.github}
  //         >
  //           <GithubIcon size={20} />
  //           GitHub
  //         </Link>
  //       </div>

  //       <div className="mt-8">
  //         <Snippet hideCopyButton hideSymbol variant="bordered">
  //           <span>
  //             Get started by editing{" "}
  //             <Code color="primary">pages/index.tsx</Code>
  //           </span>
  //         </Snippet>
  //       </div>
  //     </section>
  //   </DefaultLayout>
  // );
}
