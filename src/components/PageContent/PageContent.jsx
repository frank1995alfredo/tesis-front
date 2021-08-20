import Sidebar from "../Sidebar/Sidebar"


const PageContent = ({children}) => {
    return (
       <Sidebar>
            <div id="page-content-wrapper">
                {children}
            </div>
       </Sidebar>    
    )
}

export default PageContent