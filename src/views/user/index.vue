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

    <el-table :data="tableData" border stripe>
      <el-table-column prop="username" label="登录名" />
      <el-table-column prop="realName" label="用户名" />
      <el-table-column prop="workNo" label="工号" />
      <el-table-column prop="orgName" label="所属组织" />
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
      <el-table-column label="启用状态" width="100">
        <template #default="{ row }">
          <el-switch v-model="row.enabled" @change="handleEnabled(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
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

    <el-pagination
      v-model:current-page="form.pageIndex"
      v-model:page-size="form.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <Dialog ref="dialog" :id="id" @close="onSearch" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { User, pageUser, removeUser, enabledUser } from "@/api/user";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Dialog from "@/components/User/Dialog.vue";
import { FormInstance, ElMessageBox, ElMessage } from "element-plus";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Plus from "@iconify-icons/ep/plus";
import { useRouter } from "vue-router";
import Link from "@iconify-icons/ep/link";
import dayjs from "dayjs";

defineOptions({
  name: "App"
});
const loading = ref(false);
const total = ref(0);
const tableData = ref<User[]>([]);
const form = reactive({
  name: "",
  pageIndex: 1,
  pageSize: 10
});
const id = ref();
const formRef = ref<FormInstance>();
const dialog = ref();
const router = useRouter();

const resetForm = () => {
  form.name = "";
  form.pageIndex = 1;
  form.pageSize = 10;
  onSearch();
};

const onSearch = async () => {
  loading.value = true;

  try {
    const data = await pageUser(form);
    tableData.value = data.data;
    total.value = data.total;
  } catch (e) {
    ElMessage.error(e.message);
  } finally {
    loading.value = false;
  }
};

function handleCurrentChange(val: number) {
  form.pageIndex = val;
  onSearch();
}
function handleSizeChange(val: number) {
  form.pageIndex = 1;
  form.pageSize = val;
  onSearch();
}

const openAddOrEdit = (app: User | undefined | null) => {
  id.value = app?.id;
  dialog.value.dialogVisible = true;
};

const handleDelete = async (app: User) => {
  ElMessageBox.confirm(`确定要删除 ${app.username}？`).then(async () => {
    try {
      await removeUser(app.id);
      await onSearch();
    } catch (e) {
      ElMessage.error(e.message);
    }
  });
};

const dayFormat = (time: string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

const handleEnabled = async (user: User) => {
  try {
    await enabledUser(user.id);
    onSearch();
  } catch (e) {
    ElMessage.error(e.message);
  }
};

onMounted(() => {
  onSearch();
});
</script>
