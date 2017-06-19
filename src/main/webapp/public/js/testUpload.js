(function() {

    var btn = document.getElementById('J_UploadPictureBtn')
    var progressElem = document.getElementById('J_UploadProgress')
    var previewElem = document.getElementById('J_PicturePreview')
    var newForm = document.getElementById('newForm')
    btn.addEventListener('click', function() {
        uploadAction({
            success: function(result) {
                console.log(result)
                if (result && result.success && result.data) {
                    previewElem.innerHTML = '<img src="http://115.159.26.94:9001/' + result.data + '" style="max - width: 100 % " id="upImage">';

                    //建立话题
                    newForm.innerHTML ='院：<input type="text" id="yuan" value=""><br>系：<input type="text" id="xi" value=""><br>班级：<input type="text" id="class" value=""><br>手机号：<input type="text" id="phone" value=""><br><button class="btn" id="create" onclick="createTopic()">创建话题</button>'
                    
                }
            },
            progress: function(data) {
                if (data && data * 1 > 0) {
                    progressElem.innerText = data
                }
            }
        })
    })


    /**
     * 类型判断
     * @type {Object}
     */
    var UtilType = {
        isPrototype: function(data) {
            return Object.prototype.toString.call(data).toLowerCase();
        },

        isJSON: function(data) {
            return this.isPrototype(data) === '[object object]';
        },

        isFunction: function(data) {
            return this.isPrototype(data) === '[object function]';
        }
    }

    /**
     * form表单上传请求事件
     * @param  {object} options 请求参数
     */
    function requestEvent(options) {
        try {
            var formData = options.formData
            var xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {

                if (xhr.readyState === 4 && xhr.status === 200) {
                    options.success(JSON.parse(xhr.responseText))
                }
            }

            xhr.upload.onprogress = function(evt) {
                var loaded = evt.loaded
                var tot = evt.total
                var per = Math.floor(100 * loaded / tot)
                options.progress(per)
            };
            // xhr.open('post', 'http://115.159.26.94:3001/api/manager/uploadPicture')
            xhr.open('post', 'http://115.159.26.94:3001/api/manager/uploadPicture?managerId=9&token=63d225df-0a34-44eb-a9e5-470797af65ac')
            xhr.send(formData)
            // console.log(formDate)
        } catch (err) {
            options.fail(err)
        }
    }

    /**
     * 上传事件
     * @param  {object} options 上传参数      
     */
    function uploadEvent(options) {
        // let file
        // let formData = new FormData()
        var input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('name', 'files')

        input.click()
        input.onchange = function() {
            console.log(input.files.length)
            for (var i = 0; i < input.files.length; i++) {
                file = input.files[i];
                var formData = new FormData();
                formData.append('files', file);
                // formData.append('managerId', 9);
                // formData.append('planId', 1);
                // formData.append('token', "63d225df-0a34-44eb-a9e5-470797af65ac");
                requestEvent({
                    formData,
                    success: options.success,
                    fail: options.fail,
                    progress: options.progress
                })
            }


            // file = input.files[0];
            // formData.append('files', file)

            // // console.log(formData.files);
            // requestEvent({
            //     formData,
            //     success: options.success,
            //     fail: options.fail,
            //     progress: options.progress
            // })

        }

    }

    /**
     * 上传操作
     * @param  {object} options 上传参数     
     */
    function uploadAction(options) {
        if (!UtilType.isJSON(options)) {
            console.log('upload options is null')
            return
        }
        var _options = {}
        _options.success = UtilType.isFunction(options.success) ? options.success : function() {}
        _options.fail = UtilType.isFunction(options.fail) ? options.fail : function() {}
        _options.progress = UtilType.isFunction(options.progress) ? options.progress : function() {}

        uploadEvent(_options)
    }


})()