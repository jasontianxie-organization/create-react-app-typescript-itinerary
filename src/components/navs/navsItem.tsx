import React from "react";

export interface INavsItemProps {
    navTitle: string;
    show?: boolean;
}

class NavsItem extends React.Component<INavsItemProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render() {
        const {show} = this.props;
        return (
            <div style={{display: show ? "block" : "none"}}>
                {this.props.children}
            </div>
        );
    }
}

export default NavsItem;
