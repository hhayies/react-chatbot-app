import React, { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from "./TextInput";

const FormDialog = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const inputName = useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value);
    }, [setDescription]);

    // バリデーション
    const validateEmailFormat = (email) => {
        const regex =  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email);
    }

    const validateRequiredInput = (...args) => {
        for (let i = 0; i < args.length; i++) {
            if (args[i] === "") {
                return true;
            }
        }
        return false;
    };

    /**
     * 問い合わせ送信時の処理
     */
    const submitForm = () => {
        const isBlank = validateRequiredInput(name, email, description);
        const isValidEmail = validateEmailFormat(email);

        if (isBlank) {
            alert('必須入力欄が空白です');
            return false;
        } else if (!isValidEmail) {
            alert('メールアドレスの書式が異なります。');
            return false;
        } else {
            const inquireText = `
            問い合わせが完了しました\n
            お名前: ${name}\n
            メールアドレス: ${email}'\n
            【問い合わせ内容】\n
            ${description}
            `
            alert(inquireText);
            setName("");
            setEmail("");
            setDescription("");
            return props.handleClose();
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">問い合わせフォーム</DialogTitle>
            <DialogContent>
                <TextInput
                    label={"お名前(必須)"}
                    multiline={false}
                    rows={1}
                    value={name}
                    type={"text"}
                    onChange={inputName}
                />
                <TextInput
                    label={"メールアドレス(必須)"}
                    multiline={false}
                    rows={1}
                    value={email}
                    type={"email"}
                    onChange={inputEmail}
                />
                <TextInput
                    label={"お問い合わせ内容(必須)"}
                    multiline={true}
                    rows={5}
                    value={description}
                    type={"text"}
                    onChange={inputDescription}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="danger">
                キャンセル
            </Button>
            <Button onClick={submitForm} color="primary">
                送信する
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormDialog;
