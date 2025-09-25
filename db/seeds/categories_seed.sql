-- Freze & Torna
INSERT INTO categories (name, slug, path) VALUES
('Freze & Torna', 'freze-torna', 'freze-torna'),
('CNC Freze', 'cnc-freze', 'freze-torna/cnc-freze'),
('CNC Torna', 'cnc-torna', 'freze-torna/cnc-torna'),
('Dik İşleme', 'dik-isleme', 'freze-torna/dik-isleme'),
('Yatay İşleme', 'yatay-isleme', 'freze-torna/yatay-isleme');

-- Kesme & Delme
INSERT INTO categories (name, slug, path) VALUES
('Kesme & Delme', 'kesme-delme', 'kesme-delme'),
('Lazer Kesim', 'lazer-kesim', 'kesme-delme/lazer-kesim'),
('Plazma', 'plazma', 'kesme-delme/plazma'),
('Matkap Tezgâhı', 'matkap-tezgahi', 'kesme-delme/matkap-tezgahi'),
('Testereler', 'testereler', 'kesme-delme/testereler');

-- CNC & Router
INSERT INTO categories (name, slug, path) VALUES
('CNC & Router', 'cnc-router', 'cnc-router'),
('CNC Router', 'cnc-router-alt', 'cnc-router/cnc-router'),
('Kenar Bantlama', 'kenar-bantlama', 'cnc-router/kenar-bantlama'),
('Ebatlama', 'ebatlma', 'cnc-router/ebatlma');

-- Yüzey & Finisaj
INSERT INTO categories (name, slug, path) VALUES
('Yüzey & Finisaj', 'yuzey-finisaj', 'yuzey-finisaj'),
('Zımpara', 'zimpara', 'yuzey-finisaj/zimpara'),
('Pres', 'pres', 'yuzey-finisaj/pres'),
('Toz Toplama', 'toz-toplama', 'yuzey-finisaj/toz-toplama');

-- Tip
INSERT INTO categories (name, slug, path) VALUES
('Tip', 'tip', 'tip'),
('Elektrikli', 'elektrikli', 'tip/elektrikli'),
('Dizel', 'dizel', 'tip/dizel'),
('LPG', 'lpg', 'tip/lpg');

-- Ekipman
INSERT INTO categories (name, slug, path) VALUES
('Ekipman', 'ekipman', 'ekipman'),
('Sipariş Toplayıcı', 'siparis-toplayici', 'ekipman/siparis-toplayici'),
('Reach Truck', 'reach-truck', 'ekipman/reach-truck'),
('Transpalet', 'transpalet', 'ekipman/transpalet');

-- Robotik
INSERT INTO categories (name, slug, path) VALUES
('Robotik', 'robotik', 'robotik'),
('Endüstriyel Robot', 'endustriyel-robot', 'robotik/endustriyel-robot'),
('Cobot', 'cobot', 'robotik/cobot'),
('AGV/AMR', 'agv-amr', 'robotik/agv-amr');

-- Kontrol
INSERT INTO categories (name, slug, path) VALUES
('Kontrol', 'kontrol', 'kontrol'),
('PLC', 'plc', 'kontrol/plc'),
('HMI', 'hmi', 'kontrol/hmi'),
('SCADA', 'scada', 'kontrol/scada');

-- Tip (vidalı, pistonlu, yağsız)
INSERT INTO categories (name, slug, path) VALUES
('Tip', 'tip-2', 'tip-2'),
('Vidalı', 'vidali', 'tip-2/vidali'),
('Pistonlu', 'pistonlu', 'tip-2/pistonlu'),
('Yağsız', 'yagsiz', 'tip-2/yagsiz');

-- Aksesuar
INSERT INTO categories (name, slug, path) VALUES
('Aksesuar', 'aksesuar', 'aksesuar'),
('Kurutucu', 'kurutucu', 'aksesuar/kurutucu'),
('Hava Tankı', 'hava-tanki', 'aksesuar/hava-tanki'),
('Filtre', 'filtre', 'aksesuar/filtre');

-- Hat
INSERT INTO categories (name, slug, path) VALUES
('Hat', 'hat', 'hat'),
('Dolum Makinesi', 'dolum-makinesi', 'hat/dolum-makinesi'),
('Etiketleme', 'etiketleme', 'hat/etiketleme'),
('Shrink', 'shrink', 'hat/shrink');

-- Malzeme
INSERT INTO categories (name, slug, path) VALUES
('Malzeme', 'malzeme', 'malzeme'),
('Streç', 'strec', 'malzeme/strec'),
('Ambalaj', 'ambalaj', 'malzeme/ambalaj'),
('Naylonu', 'naylonu', 'malzeme/naylonu'),
('Koli Makinesi', 'koli-makinesi', 'malzeme/koli-makinesi');

-- Kaynak
INSERT INTO categories (name, slug, path) VALUES
('Kaynak', 'kaynak', 'kaynak'),
('MIG/MAG', 'mig-mag', 'kaynak/mig-mag'),
('TIG', 'tig', 'kaynak/tig'),
('MMA', 'mma', 'kaynak/mma');

-- Kesme
INSERT INTO categories (name, slug, path) VALUES
('Kesme', 'kesme', 'kesme'),
('Plazma', 'plazma-2', 'kesme/plazma'),
('Oksijen', 'oksijen', 'kesme/oksijen'),
('Lazer', 'lazer', 'kesme/lazer');

-- Konveyör
INSERT INTO categories (name, slug, path) VALUES
('Konveyör', 'konveyor', 'konveyor'),
('Bantlı', 'bantli', 'konveyor/bantli'),
('Merdaneli', 'merdaneli', 'konveyor/merdaneli'),
('Modüler', 'moduler', 'konveyor/moduler');

-- Depolama
INSERT INTO categories (name, slug, path) VALUES
('Depolama', 'depolama', 'depolama'),
('Raf Sistemleri', 'raf-sistemleri', 'depolama/raf-sistemleri'),
('AS/RS', 'as-rs', 'depolama/as-rs'),
('Kaldırma Ekipmanı', 'kaldirma-ekipmani', 'depolama/kaldirma-ekipmani');

-- Enjeksiyon
INSERT INTO categories (name, slug, path) VALUES
('Enjeksiyon', 'enjeksiyon', 'enjeksiyon'),
('Enjeksiyon Makinesi', 'enjeksiyon-makinesi', 'enjeksiyon/enjeksiyon-makinesi'),
('Kalıp', 'kalip', 'enjeksiyon/kalip'),
('Sıcak Yolluk', 'sicak-yolluk', 'enjeksiyon/sicak-yolluk');

-- Çevre
INSERT INTO categories (name, slug, path) VALUES
('Çevre', 'cevre', 'cevre'),
('Kurutucu', 'kurutucu-2', 'cevre/kurutucu'),
('Dozajlama', 'dozajlama', 'cevre/dozajlama'),
('Kırma', 'kirma', 'cevre/kirma');

-- 3D Baskı
INSERT INTO categories (name, slug, path) VALUES
('3D Baskı', '3d-baski', '3d-baski'),
('FDM', 'fdm', '3d-baski/fdm'),
('SLA', 'sla', '3d-baski/sla'),
('SLS', 'sls', '3d-baski/sls');

-- Tarama
INSERT INTO categories (name, slug, path) VALUES
('Tarama', 'tarama', 'tarama'),
('3D Tarayıcı', '3d-tarayici', 'tarama/3d-tarayici'),
('CMM', 'cmm', 'tarama/cmm'),
('Metrolog', 'metrolog', 'tarama/metrolog');

-- Ana Sayfa / Vitrin / Blog (isteğe bağlı)
INSERT INTO categories (name, slug, path) VALUES
('Ana Sayfa', 'ana-sayfa', 'ana-sayfa'),
('Vitrin', 'vitirin', 'vitrin'),
('Blog', 'blog', 'blog');
