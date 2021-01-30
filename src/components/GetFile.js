import React from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
    }
});

class getFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '' };
    }

    handleFile(e) {
    this.setState({ file:e.target.files[0] });
  }

  handleUpload(e) {
    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('name', 'skin pic');
    console.warn(this.state.file);
    axios({
         url: "http://localhost:3005/image-uploads",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "access-control-allow-origin": "*"
         },
        data:formData,
        withCredentials: true,
    })
      .then((res) => {
          if (res.status === 200) {
                    console.log("Success!")
                }else {
                    console.log("Error occurred")
                }
      })
      .catch((err) => { });
  }


    render() {
        return (
            <div className="getfile">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="get-file"
                  type="file"
                  name="file"
                  formEncType={'multipart/form-data'}
                  onChange={(e) => this.handleFile(e)}
                />
                <View style={styles.container}>
                    <label htmlFor="get-file">
                        <View style={styles.buttonContainer}>
                            <Button variant="outlined" component="span" color="primary" className="btn1">
                                Select Image
                            </Button>
                        </View>
                    </label>
                    <View style={styles.buttonContainer}>
                        <Button type="submit" variant="outlined" component="span" color="primary"
                            onClick={()=>this.handleUpload()}>Upload</Button>
                    </View>
                </View>
            </div>
        );
    }
}

export default getFile;

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}
