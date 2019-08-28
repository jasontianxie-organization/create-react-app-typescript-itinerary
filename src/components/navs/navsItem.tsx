import React from "react";

interface INavsItemProps {
    navTitle: string;
}

class NavsItem extends React.Component<INavsItemProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default NavsItem;
