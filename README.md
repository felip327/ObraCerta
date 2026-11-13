# ObraCertaApp — Diário de Bordo de Obras

Projeto React + Vite + Capacitor para registrar o progresso de uma obra com a câmera do smartphone ou imagens da galeria.

## O que foi implementado

- `@capacitor/camera` para acessar os recursos nativos.
- `Camera.getPhoto()` com qualidade `80`.
- `CameraSource.Prompt` para abrir a escolha entre câmera e galeria.
- `CameraResultType.Uri` e renderização de `image.webPath` no React.
- Estado React para exibir a imagem e mensagens.
- `try/catch/finally` para tratar cancelamento e falhas sem travar a tela.

## 1. Instalar dependências

Abra o terminal dentro da pasta do projeto:

```bash
npm install
```

## 2. Criar/sincronizar o projeto Android

Se a pasta `android` ainda não existir, execute:

```bash
npx cap add android
```

Depois, sempre que alterar o React ou instalar plugin:

```bash
npm run build
npx cap sync android
```

## 3. Conferir permissões Android

Abra `android/app/src/main/AndroidManifest.xml`. Dentro de `<manifest>` e antes de `<application>`, confira/adicone as permissões do arquivo `android/AndroidManifest-permissions.xml`.

O plugin pode declarar permissões próprias durante a sincronização. Evite duplicar entradas já existentes. Para a seleção de fotos, o Android pode usar o seletor de mídia do sistema, sem pedir acesso amplo ao armazenamento.

## 4. Abrir no Android Studio

```bash
npx cap open android
```

No Android Studio, conecte um celular com depuração USB ativada ou use um emulador com câmera configurada. Execute o app pelo botão Run.

## 5. Teste obrigatório do vídeo

1. Abra o ObraCertaApp no celular.
2. Toque em **Tirar Foto / Galeria**.
3. Mostre o seletor nativo e escolha **Tirar uma foto** ou **Escolher da galeria**.
4. Capture/selecione uma imagem e confirme.
5. Mostre a imagem aparecendo na área **Pré-visualização**.
6. Toque novamente no botão e cancele/volte.
7. Mostre a mensagem de ação cancelada e toque no botão novamente para provar que o app continua funcionando.

## Observação sobre permissões

O Android e a versão do Capacitor podem apresentar os pedidos de permissão no momento em que o recurso é utilizado. `CameraSource.Prompt` apresenta a escolha entre câmera e galeria; não substitua por `CameraSource.Camera`, pois isso força a abertura direta da câmera.

## Gerar APK debug

No Android Studio: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

Ou pelo terminal:

```bash
cd android
./gradlew assembleDebug
```

No Windows PowerShell:

```powershell
cd android
.\gradlew.bat assembleDebug
```

O APK de depuração normalmente fica em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Estrutura principal

```text
ObraCertaApp/
├── src/
│   ├── main.jsx
│   ├── ObraCertaApp.jsx
│   └── styles.css
├── android/
│   └── AndroidManifest-permissions.xml
├── capacitor.config.json
├── package.json
└── README.md
```
