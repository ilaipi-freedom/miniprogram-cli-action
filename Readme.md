# Miniprogram CLI Action

一个用于微信小程序自动化部署的 GitHub Action。

## 功能特点

- 自动化构建微信小程序
- 支持自动上传代码
- 支持版本管理
- 支持自定义配置

## 使用方法

### 基础配置

在你的 GitHub 仓库中创建 `.github/workflows/deploy.yml` 文件，添加以下内容：

```yaml
name: Deploy Miniprogram
on:
  push:
    branches:
      - main  # 或者你想要触发部署的分支

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Miniprogram
        uses: your-username/miniprogram-cli-action@v1
        with:
          appid: ${{ secrets.MINIPROGRAM_APPID }}
          private_key_path: ./private_key.key  # 使用密钥文件
          # 或者使用 private_key: ${{ secrets.MINIPROGRAM_PRIVATE_KEY }}  # 使用密钥内容
          project_path: ./
          version: ${{ github.ref_name }}
          desc: "自动部署更新"  # 可选，添加版本描述
```

### 配置参数说明

| 参数名 | 必填 | 说明 |
|--------|------|------|
| appid | 是 | 小程序的 AppID |
| private_key | 否 | 小程序代码上传密钥内容（与 private_key_path 二选一） |
| private_key_path | 否 | 小程序代码上传密钥文件路径（与 private_key 二选一） |
| project_path | 否 | 小程序项目路径，默认为 './' |
| version | 否 | 发布版本号，默认使用分支名 |
| desc | 否 | 项目备注，默认为空 |

### Secrets 配置

在仓库的 Settings -> Secrets and variables -> Actions 中添加以下 secrets：

- `MINIPROGRAM_APPID`: 你的小程序 AppID
- `MINIPROGRAM_PRIVATE_KEY`: 小程序代码上传密钥（如果使用 private_key 参数）

## 注意事项

1. 确保已在微信小程序后台开启了"小程序代码上传"功能
2. 上传密钥需要在微信小程序后台生成并保存
3. 建议在正式使用前先在测试环境验证
4. 使用 private_key_path 时，确保密钥文件已正确上传到仓库中
5. private_key 和 private_key_path 参数只需要配置其中一个即可

## 许可证

MIT License

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 更新日志

### v1.0.6
- 添加 private_key_path 参数支持
- 添加 desc 参数支持
- 优化参数验证逻辑

### v1.0.0
- 初始版本发布
- 支持基础的小程序自动化部署功能
