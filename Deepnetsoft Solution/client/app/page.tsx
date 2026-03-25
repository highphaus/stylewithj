'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuTabs from '../components/MenuTabs';
import MenuTree from '../components/MenuTree';
import MenuItemRow from '../components/MenuItemRow';
import Footer from '../components/Footer';
import CreateMenuForm from '../components/CreateMenuForm';
import CreateItemForm from '../components/CreateItemForm';
import { MenuNode, MenuItemType, CreateMenuPayload, CreateItemPayload } from '../lib/types';
import { fetchMenuTree, createMenu, createItem } from '../lib/api';

export default function Home() {
  const [menus, setMenus] = useState<MenuNode[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [selectedMenuName, setSelectedMenuName] = useState<string>('');
  
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load menu tree on mount
  const loadData = async () => {
    try {
      const data = await fetchMenuTree();
      setMenus(data);
      if (data.length > 0 && !activeTabId) {
        setActiveTabId(data[0]._id);
        setSelectedMenuId(data[0]._id);
        setSelectedMenuName(data[0].name);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const findNode = (nodes: MenuNode[], id: string): MenuNode | null => {
    for (const n of nodes) {
      if (n._id === id) return n;
      const found = findNode(n.children, id);
      if (found) return found;
    }
    return null;
  };

  const handleTabSelect = (id: string) => {
    setActiveTabId(id);
    setSelectedMenuId(id);
    const node = findNode(menus, id);
    if (node) setSelectedMenuName(node.name);
  };

  const handleCreateMenu = async (payload: CreateMenuPayload) => {
    await createMenu(payload);
    setShowMenuForm(false);
    loadData();
  };

  const handleCreateItem = async (payload: CreateItemPayload) => {
    await createItem(payload);
    setShowItemForm(false);
    loadData();
  };

  return (
    <main className="min-h-screen relative overflow-hidden menu-bg">
      <Navbar 
        onAddMenu={() => setShowMenuForm(true)} 
        onAddItem={() => setShowItemForm(true)} 
      />

      <Hero />

      {/* Doodle Section with Tabs */}
      <section 
        id="menu"
        style={{ 
          width: '100%', 
          maxWidth: '1440px', 
          height: '79px', 
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 0,
          marginBottom: 0,
          padding: 0,
          position: 'relative',
          background: 'transparent',
          zIndex: 20
        }}
      >
        <div className="doodle-bg" />
        <MenuTabs 
          menus={menus.length > 0 ? menus : [
            { _id: 'food', name: 'FOOD', children: [] },
            { _id: 'drink', name: 'DRINK', children: [] },
            { _id: 'brunch', name: 'BRUNCH', children: [] }
          ]} 
          activeMenuId={activeTabId || 'food'} 
          onSelect={handleTabSelect} 
        />
      </section>

      <div className="stone-bg" style={{ position: 'relative', zIndex: 10, marginTop: -1, padding: '100px 0' }}>

        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 60px', position: 'relative', zIndex: 10 }}>
          
          {/* Main Outer Border Box (1140x760) */}
          <div className="menu-outer-border">
            
            {/* Corners Stickers - Tucked into Box Corners */}
            <img src="/chicken_skewers.png" 
              className="sticker-chicken"
              style={{ position: 'absolute', top: 30, left: 30, width: 220, height: 220, zIndex: 10, objectFit: 'contain' }} alt="Chicken Skewers" />
            <img src="/kebab_board.png" 
              className="sticker-kebab"
              style={{ 
                position: 'absolute', top: 30, right: 30, width: 300, height: 220, zIndex: 10, 
                objectFit: 'contain', transform: 'rotate(5deg)' 
              }} alt="Kebab Board" />
            
            <img src="/sandwich.png" 
              className="sticker-sandwich"
              style={{ position: 'absolute', bottom: -50, left: -60, width: 220, height: 220, zIndex: 10, objectFit: 'contain' }} alt="Sandwich" />
            
            <img src="/salad_bowl.png" 
              className="sticker-salad"
              style={{ position: 'absolute', top: 520, right: -70, width: 250, height: 250, zIndex: 10, objectFit: 'contain' }} alt="Salad Bowl" />

            {/* Appetizers Section */}
            <div style={{ display: 'flex', marginTop: 80 }}>
              <div style={{ flex: '0 0 272px', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1.5px solid rgba(255,255,255,0.2)', padding: '10px' }}>
                <h1 className="red-header" style={{ margin: 0 }}>APPETIZERS</h1>
              </div>
              <div style={{ flex: 1, paddingLeft: 40 }}>
                <div style={{ height: 97, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', height: 38 }}>
                    <span className="item-title">FIRE CRACKER SALMON</span>
                    <div className="dots-divider" />
                    <span className="item-price">$16</span>
                  </div>
                  <p className="item-desc" style={{ marginTop: 0, height: 44 }}>Broiled Cajun salmon bites - topped with bang bang sauce, red peppers and green chiles</p>
                </div>

                <div style={{ height: 97, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', height: 38 }}>
                    <span className="item-title">LAMB CHOPS</span>
                    <div className="dots-divider" />
                    <span className="item-price">$26</span>
                  </div>
                  <p className="item-desc" style={{ marginTop: 0, height: 44 }}>Garlic and rosemary marinated lamb chops topped with our signature ground mustard sauce.</p>
                </div>

                <div style={{ height: 97, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', height: 38 }}>
                    <span className="item-title">FRIED RED SNAPPER BITES</span>
                    <div className="dots-divider" />
                    <span className="item-price">$18</span>
                  </div>
                  <p className="item-desc" style={{ marginTop: 0, height: 44 }}>Deep fried red snapper, served with a house made Cajun remoulade.</p>
                </div>
              </div>
            </div>

            {/* Salads Section with Dashed Box (947x198) */}
            <div className="dashed-box" style={{ marginLeft: 0 }}>
              <div style={{ flex: '0 0 300px', paddingRight: 40, borderRight: '1.5px solid rgba(255,255,255,0.2)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#8B0000', padding: '10px 30px', borderRadius: 4, marginBottom: 10 }}>
                  <h1 className="red-header" style={{ margin: 0, fontSize: '32px', textShadow: 'none' }}>SALADS</h1>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 0, fontStyle: 'italic' }}>Option to add protein</p>
              </div>

              <div style={{ flex: 1, paddingLeft: 40, position: 'relative' }}>
                <div style={{ marginBottom: 30 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', maxWidth: 380 }}>
                    <span className="item-title" style={{ fontSize: 20, letterSpacing: '0.03em' }}>HOUSE SALAD WITH BEANS</span>
                    <div className="dots-divider" />
                    <span className="item-price" style={{ fontSize: 20 }}>$06</span>
                  </div>
                </div>
                <div style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', maxWidth: 380 }}>
                    <span className="item-title" style={{ fontSize: 20, letterSpacing: '0.03em' }}>CAESAR SALAD</span>
                    <div className="dots-divider" />
                    <span className="item-price" style={{ fontSize: 20 }}>$08</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours Section (1137x173) */}
          <div id="reservation" className="opening-hours-box" style={{ 
            marginTop: 160, 
            width: '100%',
            maxWidth: 1137, 
            minHeight: 173, 
            margin: '0 auto',
            background: '#000', 
            borderRadius: 15, 
            border: '1px solid #C19A6B', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '20px 60px',
            position: 'relative',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400, marginBottom: 20 }}>
              <p style={{ fontStyle: 'italic', color: '#C19A6B', marginBottom: 2, fontSize: 13, fontFamily: "'Kelly Slab', cursive" }}>Be there on time</p>
              <h1 className="red-header" style={{ 
                fontSize: '32px', 
                margin: 0, 
                color: '#fff', 
                textShadow: '2px 2px #ff0000',
                letterSpacing: '1px'
              }}>OPENING HOURS</h1>
            </div>

            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', position: 'relative', zIndex: 1 }}>
              {/* Mon-Thu */}
              <div style={{ paddingLeft: 40, borderLeft: '1px solid #C19A6B' }}>
                <p style={{ fontSize: '16px', color: '#fff', marginBottom: 8, fontWeight: 500 }}>MONDAY- THURSDAY</p>
                <p style={{ color: '#0072BB', fontSize: '16px', fontWeight: 600 }}>12 PM–12 AM</p>
              </div>
              {/* Fri-Sat */}
              <div style={{ paddingLeft: 40, borderLeft: '1px solid #C19A6B' }}>
                <p style={{ fontSize: '16px', color: '#fff', marginBottom: 8, fontWeight: 500 }}>FRIDAY-SATURDAY</p>
                <p style={{ color: '#0072BB', fontSize: '16px', fontWeight: 600 }}>12 PM–01 AM</p>
              </div>
              {/* Sunday */}
              <div style={{ paddingLeft: 40, borderLeft: '1px solid #C19A6B' }}>
                <p style={{ fontSize: '16px', color: '#fff', marginBottom: 8, fontWeight: 500 }}>SUNDAY</p>
                <p style={{ color: '#0072BB', fontSize: '16px', fontWeight: 600 }}>12 PM–11 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {showMenuForm && (
        <CreateMenuForm 
          menus={menus} 
          onClose={() => setShowMenuForm(false)} 
          onSubmit={handleCreateMenu} 
        />
      )}
      {showItemForm && (
        <CreateItemForm 
          menus={menus} 
          selectedMenuId={selectedMenuId}
          onClose={() => setShowItemForm(false)} 
          onSubmit={handleCreateItem} 
        />
      )}
      
    </main>
  );
}
