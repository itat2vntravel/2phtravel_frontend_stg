import Styles from "../../app/home.module.css";
interface ITitle{
    title :string,
}
function HomeTitle(ITitle:any){

    return (
        <>
        <h1
          className={`${Styles.headingName} ${Styles.textcenter} uppercase px-4`}
        >
            {ITitle.title}
        </h1>
        </>
    )
}

export default HomeTitle;