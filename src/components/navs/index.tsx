import React from "react";
import Item from "./navsItem";
import "./index";

interface INavsItemProps {
    navTitle: string;
}
interface IChildren {
    props: INavsItemProps;
}

interface INavsProps {
    children: IChildren[];
}

interface INavsState {
    nothing?: any;
}

class Navs extends React.Component<INavsProps, INavsState> {
    public static Item = Item;
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render() {
        const {children} = this.props;
        return (
            <>
                <ul>
                {children.map((child: any, index) => {
                    return (
                        <li key={index}>
                            {child.props.navTitle}
                        </li>
                    );
                })}
                </ul>
                {children}
            </>
        );
    }
}

export default Navs;
