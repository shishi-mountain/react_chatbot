import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';
export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            descripstion: ""
        }

        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)
    }

    inputName = (event) => {
        this.setState({name: event.target.value})
    }

    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }

    inputDescription = (event) => {
        this.setState({descripstion: event.target.value})
    }

    submitForm = () => {
        // TODO: バリデーション
        const name = this.state.name
        const email = this.state.email
        const descripstion = this.state.descripstion

        const payload = {
            text: "お問い合わせがありました\n" +
            'お名前：' + name + '\n' +
            'Email：' + email + '\n' +
            '問い合わせ内容：' + descripstion
        }

        const url = 'https://hooks.slack.com/services/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'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追って連絡いたします。')
            this.setState({
                name: '',
                email: '',
                descripstion: ''
            })
            return this.props.handleClose
        })
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                お問い合わせフォーム
                </DialogTitle>
                <DialogContent>
                    <TextInput
                        label={"お名前（必須）"} multiline={false} rows={1}
                        value={this.state.name} onChange={this.inputName}
                    />
                    <TextInput
                        label={"Email"} multiline={false} rows={1}
                        value={this.state.email} onChange={this.inputEmail}
                    />
                    <TextInput
                        label={"問い合わせ内容"} multiline={true} rows={5}
                        value={this.state.descripstion} onChange={this.inputDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={this.submitForm} color="primary" autoFocus>
                        送信する
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}