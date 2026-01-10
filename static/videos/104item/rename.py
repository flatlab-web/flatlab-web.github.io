import os

# 常见视频格式（你可以按需增减）
VIDEO_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".flv", ".wmv", ".webm", ".m4v"}

def is_video(filename: str) -> bool:
    return os.path.splitext(filename)[1].lower() in VIDEO_EXTS

def rename_videos_in_current_folder():
    cwd = os.getcwd()
    files = [f for f in os.listdir(cwd) if os.path.isfile(f) and is_video(f)]
    files.sort()  # 按文件名排序，保证稳定顺序

    if not files:
        print("当前文件夹没有找到视频文件。")
        return

    # Step 1: 先改成临时名，避免覆盖
    temp_names = []
    for i, old_name in enumerate(files, start=1):
        ext = os.path.splitext(old_name)[1].lower()
        temp_name = f"__temp__{i}{ext}"
        os.rename(old_name, temp_name)
        temp_names.append(temp_name)

    # Step 2: 再统一改成 1.mp4 2.mp4 ...
    for i, temp_name in enumerate(temp_names, start=1):
        new_name = f"{i}.mp4"
        os.rename(temp_name, new_name)
        print(f"{temp_name}  ->  {new_name}")

    print("✅ 重命名完成！")

if __name__ == "__main__":
    rename_videos_in_current_folder()
