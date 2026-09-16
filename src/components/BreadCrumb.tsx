import { Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

type path = {
    title: string;
    link?: string;
};

// type Bread = {
//   title: string;
//   path: string;
// };

const BreadCrumb = ({ title, paths }: { title: string; paths: path[] }) => {
    const location = useLocation();
    //   console.log(location);
    const pathname = location.pathname;
    const pathArr = pathname.split("/");
    const newPath = pathArr.splice(1);

    console.log("Path", newPath);

    return (
        <div className=" bg-dark-white">
            <div className="container py-[40px] sm:py-[48px] md:py-[56px] lg:py-[64px] xl:py-[80px] 2xl:py-[96px] ">
                <span className="font-josefin capitalize text-[36px]">
                    {title || newPath[0]}
                </span>
                <ul className="flex gap-1">
                    <li>
                        <Link className="text-primary-dark" to="/">
                            Home
                        </Link>
                    </li>
                    {
                        paths ? (
                            <>
                          {paths.map((el, index)=>(
                                <li key={index}>
                                    <Link className="text-primary-dark" to={el.link}>
                                        {el.title}
                                    </Link>
                                </li>
                                ))}
                            </>) : (
                            <>
                                 { newPath.map((el, index) => (
                                <li key={index}>
                                    <Link className="text-primary-dark" to="/">
                                        {el}
                                    </Link>
                                </li>
                                ))}
                            </>)

                    }
                    {/* {newPath.map((el, index) => (
            <li key={index}>
              <Link className="text-primary-dark" to="/">
                {el}
              </Link>
            </li>
          ))} */}
                    {/* {paths.map((el, index) => (
            <li key={index}>
              <Link className="text-primary-dark" to={el.link}>
                {el.title}
              </Link>
            </li>
          ))} */}
                </ul>
            </div>
        </div>
    );
};

export default BreadCrumb;

// import { Link, useLocation } from "react-router-dom";

// type Bread = {
//     title: string;
// };

// const BreadCrumb = ({ title }: Bread) => {
//     const location = useLocation();

//     const paths = location.pathname.split("/").filter(Boolean);

//     return (
//         <div className="bg-dark-white">
//             <div className="container py-[40px] sm:py-[48px] md:py-[56px] lg:py-[64px] xl:py-[80px] 2xl:py-[96px]">
//                 <span className="font-josefin text-[36px]">{title}</span>

//                 <ul className="flex gap-2">
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>

//                     {paths.map((path, index) => {
//                         const route = "/" + paths.slice(0, index + 1).join("/");

//                         return (
//                             <li key={route}>
//                                 /
//                                 <Link
//                                     to={route}
//                                     className={
//                                         index === paths.length - 1
//                                             ? "text-secondary"
//                                             : ""
//                                     }
//                                 >
//                                     {path.charAt(0).toUpperCase() + path.slice(1)}
//                                 </Link>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default BreadCrumb;

{
    /* <li>
                <Link className="text-primary-dark" to="/">
                  {newPath[0]}
                </Link>
              </li>
              <li>
                <Link className="text-primary-dark" to="/pages">
                  {props.itemTwo}
                </Link>
              </li>
              <li>
                <span>
                  <Link
                    className={
                      location.pathname ? "text-secondary" : "text-primary-dark"
                    }
                    to={props.path}
                  >
                    {location.pathname.replace("/", "")}
                  </Link>
                </span>
              </li> */
}
