<template>
    <el-dialog
            title="新增"
            :visible.sync="dialogState"
            @close="close"
            width="580px">
        <el-form :model="formData" ref="addInfoForm">
            <el-form-item
                    label="类别："
                    prop="category"
                    :label-width="formConfig.formLabelWidth">
                <el-select placeholder="请选择活动区域" v-model="formData.category">
                    <el-option
                        v-for="categoryType in categoryTypeList"
                        :key="categoryType.id"
                        :value="categoryType.id"
                        :label="categoryType.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                    label="标题："
                    prop="title"
                    :label-width="formConfig.formLabelWidth">
                <el-input v-model="formData.title" placehoder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item
                    label="概况："
                    prop="content"
                    :label-width="formConfig.formLabelWidth">
                <el-input
                        type="textarea"
                        v-model="formData.content"
                        placehoder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {getInfoCategoryListByLevel} from "@/api/infoCategory";

    export default {
        name: "DialogInfoListAdd",
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                formData: {
                    title: '',
                    content: '',
                    category: ''
                },
                formConfig: {
                    formLabelWidth: '70px'
                },
                dialogState: false,
                categoryTypeList: []
            }
        },
        methods: {
            close() {
                this.dialogState = false;
                this.$emit("close", false);
            },

            submit() {

            },

            getCategory() {
                getInfoCategoryListByLevel(1).then(response => {
                    this.categoryTypeList = response.data;
                })
            }
        },
        watch: {
            dialogVisible(newVal){
                this.dialogState = newVal;
            }
        },

        mounted() {
            this.getCategory();
        }

    }
</script>

<style scoped>

</style>