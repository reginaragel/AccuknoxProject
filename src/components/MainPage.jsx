import React, { useState } from "react";
import { assets } from "./assets/image";
import './MainPage.css';
import Widget from "./Widget";

const categories=['CSPM','CWPP','Image','Ticket'];
const MainPage=()=>{

    const [isOpen,setIsOpen]=useState(false);
    const [widgets,setWidgets]=useState([])
    const [name,setName]=useState('');
    const [widgetText,setWidgetText]=useState('');
    const [selectedCategory,setSelectedCategory]=useState('');
    const [searchTerm,setSearchTerm]=useState('');

    const handleAddWidget=()=>{
        setIsOpen(true)
    }
    const handleClose=()=>{
        setIsOpen(false)
    }

    const handleConfirm=()=>{
        const newWidget={
            id:Date.now().toString(),
            name:name,
            data:[2,2],
            labels:["Connected","Not Connected"],
            colors:["#4A90E2","#E8E8E8"],
        };
        setWidgets([...widgets,newWidget]);
        setIsOpen(false);
        setName('');
        setWidgetText('');

        

        const updateWidgets=[...widgets];
         if(selectedCategory==='CSPM'){
            updateWidgets.push({...newWidget,category:"CSPM"});
        }else if(selectedCategory==="CWPP"){
            updateWidgets.push({...newWidget,category:"CWPP"})
        }
        setWidgets(updateWidgets);
        setIsOpen(false);
        setName('');
        setWidgetText('');
        setSelectedCategory('');
    };
    const removeWidget=(widgetId)=>{
        const updatedWidgets=widgets.filter(widget=>widget.id !==widgetId);
        setWidgets(updatedWidgets)
    }

    const filteredWidgets=widgets.filter(widget=>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return(
        <div>
            <div className="header-navbar">
                <div className="home">
                    <span>Home</span>
                    <img src={assets.right_icon} alt="home"/>
                </div>
                <div className="dashboard">
                    <span>Dashboard V2</span>
                </div>
                <div className="right-side">
                    <div className="input-box">
                        <input type="text" placeholder="Search anything...."
                        value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                    </div>
                    <div className="name">
                        <span>Name</span>
                    </div>
                    <div className="bell">
                        <img src={assets.bell_icon} alt="bell"/>
                    </div>
           
                </div>
            </div>
            <div className="second-level">
                <div className="top">
                    <div className="title-elements">
                        <span className="title">CNAPP Dashboard</span>
                        <div className="side">
                            <button className="add-widget" onClick={handleAddWidget}>
                                <span>Add Widget</span>
                                <img src={assets.plus_icon} alt="add" />
                           </button>
                           <div className="refresh">
                                <img src={assets.refresh_icon} alt="refresh"/>
                           </div>
                           <div className="dot">
                                <img src={assets.dot_icon} alt="dot"/>
                           </div>
                           <div className="clock">
                                <img src={assets.clock_icon} alt="clock"/>
                           </div>
                           <div className="days">
                                <select>
                                    <option>Last 2 Days</option>
                                    <option>Last 7 Days</option>
                                    <option>Last Week</option>
                                    <option>Last Month</option>
                                </select>
                           </div>

                        </div>
                        
                          
                           
                    </div>
                    
                </div>
            </div>
            <div className="widget1">
                <span>CSPM Executive DashBoard</span>

            </div>
            <div className="widgets">
            {filteredWidgets.filter(widget => widget.category === "CSPM").map((widget, index) => (
                    <Widget key={index} title={widget.name}
                    data={widget.data} labels={widget.labels}
                    colors={widget.colors}
                    onRemove={()=>removeWidget(widget.id)}/>
                ))}
            </div>
            <div className="widget2">
                <span>CWPP Dashboard</span>
            </div>
            <div className="widgets">
            {filteredWidgets.filter(widget => widget.category === "CWPP").map((widget, index) => (
                    <Widget key={index} title={widget.name}
                    data={widget.data} labels={widget.labels}
                    colors={widget.colors}
                    onRemove={()=>removeWidget(widget.id)}/>
                ))}
            </div>
            {isOpen && (<form>
                <div className="heading">
                    <span>Add Widget</span>
                    <img src={assets.wrong_icon} alt="wrong" onClick={handleClose}/>
                </div>
                <div className="head">
                    <span>Personalize your dashboard by adding the following widget</span>
                </div>
                <nav className="list">
                    <ul>
                        <li onClick={()=>setSelectedCategory("CSPM")}>
                            <input type="radio" name="category"
                            value="CSPM" checked={selectedCategory==="CSPM"}
                            onChange={()=>setSelectedCategory("CSPM")}
                            />CSPM</li>
                        <li onClick={()=>setSelectedCategory("CWPP")}>
                            <input type="radio"
                            name="category" value="CWPP"
                            checked={selectedCategory==="CWPP"}
                            onChange={()=>setSelectedCategory("CWPP")}/>CWPP</li>
                        <li>Image</li>
                        <li>Ticket</li>

                    </ul>
                </nav>
                <div className="user-input">
                    <input type="text" placeholder="Widget Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder="Widget Text" value={widgetText} onChange={(e)=>setWidgetText(e.target.value)}/>
                </div>
                <div className="btns">
                    <button className="btn1" onClick={handleClose}>Cancel</button>
                    <button className="btn2" onClick={handleConfirm}>Confirm</button>
                </div>

            </form>)}

        </div>
    )
}
export default MainPage