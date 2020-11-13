# Instruction



## Installation
- Install [VsCode](https://code.visualstudio.com/)

- Install [GIT](https://github.com/git-for-windows/git/releases/download/v2.29.2.windows.2/Git-2.29.2.2-64-bit.exe)

- Select the folder where you want to store the project. Right click on the folder and choose `Open with code`.

- `Ctrl + Shift + p` to open **setting.json**, paste this line `"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",` into head of the largest bracket {}. 

- Close VsCode and open the folder with vscode again

- `` Ctrl + ` `` to open Terminal in VsCode. 


- Use git to install project:
```bash
git clone https://github.com/RamenHoang/TTCN.git
cd TTCN
npm install
```
- Create *env.sh* file ,whose content is same as *env.example.sh* file, in **sh** folder. Replace `***` by `your configuration variable`.

## Usage

#### Every launching project:
- Open Terminal in VsCode and type `source sh/env.sh` to export environment variables
- Type `npm run dev` to run project in monitoring mode
- Press `F5` to start Debbuging

#### [Documentation](localhost:12345/api/docs)
#### [Main](localhost:12345/api/v1) 
