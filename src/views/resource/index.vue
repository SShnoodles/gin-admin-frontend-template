<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="form">
      <el-form-item label="名称：">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="路径：">
        <el-input v-model="form.path" clearable />
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
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="method" label="方法" />
      <el-table-column prop="path" label="路径" />
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
import { Resource, pageResource } from "@/api/resource";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { FormInstance, ElMessage } from "element-plus";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import dayjs from "dayjs";

defineOptions({
  name: "App"
});
const loading = ref(false);
const total = ref(0);
const tableData = ref<Resource[]>([]);
const form = reactive({
  name: "",
  path: "",
  pageIndex: 1,
  pageSize: 10
});
const id = ref();
const formRef = ref<FormInstance>();
const dialog = ref();

const resetForm = () => {
  form.name = "";
  form.pageIndex = 1;
  form.pageSize = 10;
  onSearch();
};

const onSearch = async () => {
  loading.value = true;

  try {
    const data = await pageResource(form);
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

const dayFormat = (time: string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(() => {
  onSearch();
});
</script>
