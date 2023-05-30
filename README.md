# h2o_tracking_server

# Versionamiento primera vez
echo "# h2o_tracking_server" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mipecab/h2o_tracking_server.git
git push -u origin main

# Bajar cambios a la rama local main
git init
git branch -M main
git pull origin main

# Actualizar la rama remota al repositorio local
git fetch origin

# Como saber si en la rama remota hay cambios
git diff origin/master


# Cómo resolver conflictos
Para actualizar cambios de forma correcta se deben obtener los cambios del repo remoto con el comando git pull origin main. Ver https://www.freecodecamp.org/news/error-failed-to-push-some-refs-to-how-to-fix-in-git/. Luego, los conflictos se resuelven así:



# Paso a paso referencia para implementar JWT
https://bluuweb.github.io/node/07-jwt/
Para validar tokens: https://jwt.io/
https://www.freecodecamp.org/news/how-to-sign-and-validate-json-web-tokens/
https://www.bezkoder.com/node-js-jwt-authentication-mysql/


# Comnandos GIT para actualizar repositorio central
git status
git add <archivos cambios> 
git commit -m 'subir cambios'
git push origin main 
git pull origin main --> muestra conflictos
--> resolver manualmente cambios
git add <archivos con conflictos resueltos>
git commit -m 'subir cambios'
git merge <archivos con conflictos resueltos>
git push origin main


# How to remove node_modules

## Create a `.gitignore` file

1. Check for an existing `.gitignore` file in the project directory

```Bash
ls -a
```

2. If your project directory has a `.gitingore` file - skip to step 3. Otherwise, continue with:

Create a `.gitignore` file in the git repository

```Bash
touch .gitignore
```

## Remove the `node_modules` directory

3. Open up the `.gitignore` and add the following line to the file 

```
**/node_modules
```

4. Remove the `node_modules` folder from the git repository

```Bash
git rm -r --cached node_modules
```

## Commit All Changes

5. Commit the git repository without the `node_modules` folder

```Bash
git commit -m "Removed node_modules folder"
```

6. Push the change to the remote repo

```
git push origin main
```
  
7. Commit the `.gitignore` file

```Bash
git add .gitignore
git commit -m "Updated the .gitignore file"
git push origin main
```
