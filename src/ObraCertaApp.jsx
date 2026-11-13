import React, { useState } from 'react';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import { Camera as CameraIcon, CheckCircle2, HardHat, ImagePlus, RotateCcw } from 'lucide-react';

export default function ObraCertaApp() {
  const [fotoObra, setFotoObra] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  // Abre o seletor nativo do Android: Câmera ou Galeria.
  const registrarProgresso = async () => {
    setMensagem('');
    setErro(false);
    setCarregando(true);

    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        promptLabelHeader: 'Adicionar foto da obra',
        promptLabelPhoto: 'Escolher da galeria',
        promptLabelPicture: 'Tirar uma foto',
      });

      // webPath é a URL temporária que a WebView consegue renderizar.
      if (image?.webPath) {
        setFotoObra(image.webPath);
        setMensagem('Foto adicionada ao diário de obras!');
        setErro(false);
      } else {
        setMensagem('Não foi possível carregar a imagem. Tente novamente.');
        setErro(true);
      }
    } catch (error) {
      // Cancelar a câmera/galeria pode rejeitar a Promise.
      // O cancelamento é tratado sem fechar nem travar o aplicativo.
      console.info('Captura cancelada ou não concluída:', error);
      setMensagem('Ação cancelada. Você pode tentar novamente quando quiser.');
      setErro(false);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><HardHat size={21} /></div>
          <span>Obra<span className="brand-accent">Certa</span></span>
        </div>
        <span className="status"><span className="status-dot" /> Diário ativo</span>
      </header>

      <section className="page-heading">
        <div className="eyebrow">ALUNO 06 <span>•</span> REGISTRO DE CAMPO</div>
        <h1>Diário de Bordo<br />de Obras</h1>
        <p className="subtitle">Registre o progresso da estrutura diretamente no canteiro de obras.</p>
      </section>

      <section className="info-card">
        <div className="info-icon"><CameraIcon size={19} /></div>
        <div>
          <strong>Registro fotográfico</strong>
          <p>Use a câmera do celular ou escolha uma imagem da galeria para documentar o avanço da obra.</p>
        </div>
      </section>

      <section className="capture-card">
        <div className="section-title">
          <div>
            <span className="section-kicker">ATUALIZAÇÃO DIÁRIA</span>
            <h2>Progresso da estrutura</h2>
          </div>
          <span className="quality-tag">80% qualidade</span>
        </div>

        <button className="capture-button" onClick={registrarProgresso} disabled={carregando}>
          {carregando ? <span className="spinner" /> : <CameraIcon size={19} />}
          {carregando ? 'Abrindo câmera...' : 'Tirar Foto / Galeria'}
        </button>

        {mensagem && (
          <div className={`message ${erro ? 'message-error' : 'message-success'}`} role="status">
            {erro ? <RotateCcw size={17} /> : <CheckCircle2 size={17} />}
            <span>{mensagem}</span>
          </div>
        )}

        <div className="preview-heading">
          <span>PRÉ-VISUALIZAÇÃO</span>
          {fotoObra && <span className="photo-ready">FOTO REGISTRADA</span>}
        </div>

        {fotoObra ? (
          <div className="photo-frame">
            <img src={fotoObra} alt="Registro do progresso da obra" />
            <div className="photo-caption">
              <CheckCircle2 size={16} /> Imagem carregada com sucesso
            </div>
          </div>
        ) : (
          <div className="empty-preview">
            <div className="empty-icon"><ImagePlus size={29} /></div>
            <strong>Nenhuma foto registrada</strong>
            <p>A imagem selecionada aparecerá aqui.</p>
          </div>
        )}
      </section>

      <div className="technical-note">
        <span className="note-mark">!</span>
        <p><strong>Requisito técnico:</strong> CameraSource.Prompt • CameraResultType.Uri • qualidade 80% • webPath</p>
      </div>

      <footer>OBRACERTA <span>•</span> DIÁRIO DE CAMPO</footer>
    </main>
  );
}