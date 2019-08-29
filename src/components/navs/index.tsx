import React from "react";
import {default as Item, INavsItemProps} from "./navsItem";
import "./index.scss";

// interface INavsItemProps {
//     navTitle: string;
//     show?: boolean;
// }
interface IChildren {
    props: INavsItemProps;
}

interface INavsProps {
    children: any[];
}

interface INavsState {
    indexToShow: number;
}

class Navs extends React.Component<INavsProps, INavsState> {
    public static Item = Item;
    constructor(props: any) {
        super(props);
        this.state = {
            indexToShow: 0, // 0表示一个都不显示,1表示显示第一个，2表示显示第二个。。。。
        };
    }
    public clickTitle(index: number) {
        const {indexToShow} = this.state;
        this.setState({indexToShow: (indexToShow === index ? 0 : index)});
    }
    public render() {
        const {children} = this.props;
        const {indexToShow} = this.state;
        return (
            <>
                <ul>
                {children.map((child: any, index: number) => {
                    return (
                        <li key={index} onClick={() => this.clickTitle(index + 1)}>
                            {child.props.navTitle}
                        </li>
                    );
                })}
                </ul>
                {children.map((child: any, index: number) => {
                    return React.cloneElement(child, {
                        show: indexToShow === (index + 1),
                        navTitle: child.props.navTitle,
                        key: index,
                      });
                })}
            </>
        );
    }
}

export default Navs;
