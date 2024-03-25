<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="form">
      <el-form-item label="名称：">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm">
          重置
        </el-button>
        <el-button
          type="success"
          :icon="useRenderIcon(Plus)"
          @click="openAddOrEdit(null)"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" row-key="id" border stripe default-expand-all>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="sort" label="序号" />
      <el-table-column prop="createdAt" label="创建时间" width="180">
        <template #default="{ row }">
          {{ dayFormat(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="180">
        <template #default="{ row }">
          {{ dayFormat(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button
            type="success"
            size="small"
            :icon="useRenderIcon(Plus)"
            @click="openChildAdd(row)"
          >
            新增
          </el-button>
          <el-button
            type="primary"
            size="small"
            :icon="useRenderIcon(EditPen)"
            @click="openAddOrEdit(row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            :icon="useRenderIcon(Delete)"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Dialog
      ref="dialog"
      :id="id"
      :pid="pid"
      :pidName="pidName"
      @close="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { Menu, pageMenus, removeMenu } from "@/api/menu";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Dialog from "@/components/Menu/Dialog.vue";
import { FormInstance, ElMessageBox, ElMessage } from "element-plus";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Plus from "@iconify-icons/ep/plus";
import dayjs from "dayjs";

defineOptions({
  name: "App"
});
const loading = ref(false);
const tableData = ref<Menu[]>([]);
const form = reactive({
  name: ""
});
const id = ref();
const pid = ref();
const pidName = ref();
const formRef = ref<FormInstance>();
const dialog = ref();

const resetForm = () => {
  form.name = "";
  onSearch();
};

const onSearch = async () => {
  loading.value = true;
  try {
    tableData.value = await pageMenus(form);
  } catch (e) {
    ElMessage.error(e.message);
  } finally {
    loading.value = false;
  }
};

const openAddOrEdit = (menu: Menu | undefined | null) => {
  id.value = menu?.id;
  pid.value = null;
  pidName.value = null;
  dialog.value.dialogVisible = true;
};

const openChildAdd = (menu: Menu) => {
  id.value = null;
  pid.value = menu?.id;
  pidName.value = menu?.name;
  dialog.value.dialogVisible = true;
};

const handleDelete = async (menu: Menu) => {
  ElMessageBox.confirm(`确定要删除 ${menu.name}？`).then(async () => {
    try {
      await removeMenu(menu.id);
      await onSearch();
    } catch (e) {
      ElMessage.error(e.message);
    }
  });
};

const dayFormat = (time: string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(() => {
  onSearch();
});
</script>
