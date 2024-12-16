const uploadToCloudnary = async(pics) => {

    if(pics) {
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset","instagram");
        data.append("cloud_name","")
    }
}