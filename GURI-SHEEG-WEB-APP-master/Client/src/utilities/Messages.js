import swal from "sweetalert";

const icons = {
  errorIcon: {
    icon: "error",
  },
  successIcon: {
    icon: "success",
  },
};

/**
 *
 * @param {func} callback - trigred when something occurred and user hits yes
 * @param {string} message
 * @param {string} title
 * @param {string} responseMessage
 *
 */
export const showWarning = (
  callback,
  message = "",
  title = "",
  responseMessage = ""
) => {
  swal({
    title: title == "" ? "Are you sure?" : title,
    text:
      message == ""
        ? "Once deleted, you will not be able to recover this Data!"
        : message,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      await callback();
      swal(
        responseMessage == ""
          ? "The record has been removed!"
          : responseMessage,
        {
          icon: "success",
        }
      );
    } else {
    }
  });
};


//FIXED 
export const showWarningWithResponse = (
  loadDataCallback,
  callback,
  message = "",
  title = "",
  responseMessage = ""
) => {
  swal({
    title: title == "" ? "Are you sure?" : title,
    text:
      message == ""
        ? "Once deleted, you will not be able to recover this Data!"
        : message,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      const { hasError, error, message } = await callback();
      if (hasError)
        swal(error + " " + message, {
          ...icons.errorIcon,
        });
      else {
        swal(message, { ...icons.successIcon });
        if (loadDataCallback != null) loadDataCallback();
      }
    } else {
    }
  });
};
