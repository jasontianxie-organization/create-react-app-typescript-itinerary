import * as React from "react";
import "./index.scss";
import { Button } from "antd";

type PropsStyle = (input: string) => void;

export default class ItineraryEditor extends React.Component<PropsStyle, any> {
    private textInput: any;
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            focused: false,
            selection: null,
            range: null,
        };
    }
    public insertPicOrPaste(e: any) { // 只允许用户粘贴纯文本，安全考虑
        let str = "";
        const {selection, range} = this.state;

        if (!this.state.focused || !range) { // 当用户没有点击输入框的时候，如果点击插入图片，则插入操作不生效
            return;
        }
        if (e === "insertPic") { // 如果是插入图片或者表情
            const background = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&amp;fm=27&amp;gp=0.jpg";
            str = "<img src='" + background + "' style='width:100px;height:100px;'/>";
        } else { // 如果是用户粘贴内容
            e.preventDefault(); // 不使用默认的粘贴方法，而是使用下面的range来插入内容
            str = window.clipboardData && window.clipboardData.getData ?
            window.clipboardData.getData("Text") // ie浏览器，getData("Text")只会获取纯文本（只允许用户粘贴纯文本，安全考虑），除了Text，还有其他参数吗？？
            : e.clipboardData.getData("Text"); // 非ie浏览器，getData("Text")只会获取纯文本（只允许用户粘贴纯文本，安全考虑）
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // 将script标签替换成文本
        }
        if (!window.getSelection) {// 如果是ie 浏览器
            this.textInput.current.focus();
            range.pasteHTML(str); // 这个方法只有ie浏览器有
            range.collapse(false); // 折叠到range的终点，https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapse
            range.select(); // 需要这个方法吗？
        } else {
            const fragment = range.createContextualFragment(str); // 上面的range.pasteHTML这个方法只有ie浏览器有，其他浏览器的range智能用insertNode方法插入dom节点（或者dom片段Fragment），所以我们这里是创建了一个fragment片段
            range.insertNode(fragment); // 因为没有pasteHTML这个方法，所以使用insertNode来插入fragment片段
            selection.removeAllRanges();
            range.collapse(false);
            selection.addRange(range);
        }
    }
    public input(e: any) { // 当用户输入内容后，光标会随着移动，所以需要重新获取光标的位置。
        const selection = window.getSelection ? window.getSelection() : document.selection; // window.getSelection是Chrome，FF，等主流浏览器方法，document.selection是IE方法
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public keyup(e: any) {
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) { // 上下左右键
            const selection = window.getSelection ? window.getSelection() : document.selection;
            const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            this.setState({ selection, range });
        }
    }
    public focus(bool: boolean, e?: any) {
        if(e && e.relatedTarget && e.relatedTarget.className.includes('ant-btn')) {
            return;
        }
        this.setState({ focused: bool });
    }
    public click(e: any) {
        const selection = window.getSelection ? window.getSelection() : document.selection;
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public submit() {
        console.log(this.textInput.current.innerHTML);
        // axios.post(config.mainDomain + "/itineraries", {userId: Cookies.get("userid"), contentHtml: this.textInput.current.innerHTML}).then((response) => {
        //    console.log("success");
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }
    public render() {
        return (
        <div styleName="edit-wrap">
            <Button onClick={() => this.insertPicOrPaste("insertPic")}>插入测试图片</Button>
            <div contentEditable={true} styleName = "edit" ref={this.textInput}
                onPaste={(e) => this.insertPicOrPaste(e)}
                onClick={(e) => this.click(e)}
                onKeyUp={(e) => this.keyup(e)}
                onFocus={() => this.focus(true)}
                onBlur={(e) => this.focus(false, e)}
                onInput={(e) => this.input(e)}>
            </div>
            <Button type="primary" styleName = "edit-submit" onClick={() => this.submit()}>保存</Button>
        </div>
        );
    }
}
