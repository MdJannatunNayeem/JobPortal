import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);


class FromHelper{
    getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (err) => {
                reject(err);
            };
        });
    }

    SuccessToast(msg) {
        toast.success(msg);
    }
    ErrorToast(msg) {
        toast.error(msg);
    }
    IsEmpty(value) {
        return value.length === 0; // true if get empty
    }

    DeleteAlert() {
        return MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            iconHtml: "icon",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                return true;
            }
        });
    }
}

export const {getBase64,ErrorToast,SuccessToast,IsEmpty,DeleteAlert} =new FromHelper();