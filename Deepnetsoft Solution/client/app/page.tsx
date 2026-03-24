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

  // Get children and items for the selected menu
  const findNode = (nodes: MenuNode[], id: string): MenuNode | null => {
    for (const n of nodes) {
      if (n._id === id) return n;
      const found = findNode(n.children, id);
      if (found) return found;
    }
    return null;
  };

  const activeNode = selectedMenuId ? findNode(menus, selectedMenuId) : null;
  
  // Tab click: resets selection to the tab itself
  const handleTabSelect = (id: string) => {
    setActiveTabId(id);
    setSelectedMenuId(id);
    const node = findNode(menus, id);
    if (node) setSelectedMenuName(node.name);
  };

  const handleMenuSelect = (id: string, name: string) => {
    setSelectedMenuId(id);
    setSelectedMenuName(name);
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

  const activeTabNode = menus.find(m => m._id === activeTabId);

  return (
    <main className="min-h-screen menu-bg relative overflow-hidden">
      {/* Background Doodle Layer */}
      <div className="doodle-bg" />

      <Navbar 
        onAddMenu={() => setShowMenuForm(true)} 
        onAddItem={() => setShowItemForm(true)} 
      />
      
      <Hero />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Pattern Strip behind tabs */}
        <div style={{ height: 100, background: 'rgba(255,255,255,0.02)', position: 'absolute', top: 0, left: 0, right: 0 }} />
        
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 100px', position: 'relative' }}>
          <MenuTabs 
            menus={menus} 
            activeMenuId={activeTabId} 
            onSelect={handleTabSelect} 
          />

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'minmax(200px, 250px) 1fr', 
              gap: 40, 
              alignItems: 'start',
              marginTop: 40 
            }} 
            className="mobile-stack"
          >
            {/* Sidebar */}
            <aside 
              style={{ 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: 4, 
                padding: 24, 
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'sticky',
                top: 100
              }}
            >
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em', fontSize: '1.2rem', marginBottom: 20 }}>
                MENU CATEGORIES
              </h3>
              {activeTabNode && (
                <MenuTree 
                  menu={activeTabNode} 
                  selectedId={selectedMenuId} 
                  onSelect={handleMenuSelect} 
                />
              )}
            </aside>

            {/* Menu Content */}
            <div style={{ position: 'relative' }}>
              {/* Floating food assets */}
              <img 
                src="file:///C:/Users/Admin/.gemini/antigravity/brain/bd76e906-0d80-4e90-8771-c75e7254e7f6/skewers_transparent_1774340961085.png" 
                style={{ position: 'absolute', top: -100, left: -60, width: 250, zIndex: 20 }}
                alt=""
              />

              {/* Header with DUAL lines */}
              <div className="category-header">
                 <div className="dual-lines">
                    <div className="line-gold" />
                    <div className="line-gold" style={{ opacity: 0.5 }} />
                 </div>
                 <h2 
                   style={{ 
                     fontFamily: "'Cinzel', serif", 
                     fontWeight: 900, 
                     fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                     letterSpacing: '0.1em',
                     color: '#fff',
                     textAlign: 'center'
                   }}
                   className="menu-title-shadow"
                 >
                   {selectedMenuName.toUpperCase()}
                 </h2>
                 <div className="dual-lines">
                    <div className="line-gold" />
                    <div className="line-gold" style={{ opacity: 0.5 }} />
                 </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5, fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem' }}>Loading Menu...</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '50px 120px', marginTop: 30 }}>
                  {activeNode?.items && activeNode.items.length > 0 ? (
                    activeNode.items.map(item => (
                      <MenuItemRow key={item._id} item={item} />
                    ))
                  ) : (
                    <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.3, fontFamily: "'Bebas Neue', sans-serif" }}>No items in this category.</p>
                  )}
                </div>
              )}
              
              {/* Children categories - Special Boxes for Salads/Drinks */}
              {activeNode?.children?.map(sub => {
                const isSpecial = sub.name.toLowerCase().includes('salad') || sub.name.toLowerCase().includes('drink');
                return (
                  <div 
                    key={sub._id} 
                    className={isSpecial ? "special-box" : ""}
                    style={{ marginTop: 100 }}
                  >
                    {isSpecial && sub.name.toLowerCase().includes('salad') && (
                      <img 
                        src="file:///C:/Users/Admin/.gemini/antigravity/brain/bd76e906-0d80-4e90-8771-c75e7254e7f6/salad_bowl_transparent_1774340976429.png" 
                        style={{ position: 'absolute', top: -70, right: 30, width: 160 }}
                        alt=""
                      />
                    )}

                    <div style={{ marginBottom: 40, textAlign: isSpecial ? 'left' : 'center' }}>
                      <div className={isSpecial ? "red-badge" : ""}>
                        {sub.name.toUpperCase()}
                      </div>
                      <p className="serif-accent" style={{ marginTop: isSpecial ? 0 : 10, fontSize: '1.1rem' }}>
                        {sub.description}
                      </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '50px 120px' }}>
                        {sub.items.map(item => <MenuItemRow key={item._id} item={item} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Opening Hours Info Card before footer */}
      <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 24px' }}>
         <div 
           className="gold-card" 
           style={{ 
             background: 'rgba(5,5,5,0.9)', 
             padding: '40px', 
             display: 'flex', 
             flexDirection: 'column',
             alignItems: 'center',
             gap: 40,
             textAlign: 'center',
             border: '1px solid rgba(255,255,255,0.1)'
           }}
         >
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--gold)', marginBottom: 8, fontSize: '1.2rem' }}>Be there on time</p>
              <h2 style={{ fontSize: '3.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em', color: '#fff' }} className="menu-title-shadow">OPENING HOURS</h2>
            </div>
            
            <div style={{ display: 'flex', gap: 60, textAlign: 'center' }} className="mobile-stack">
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 10, letterSpacing: '0.1em' }}>MONDAY - THURSDAY</p>
                <p style={{ color: 'var(--blue-accent)', fontWeight: 600, fontSize: '1.1rem' }}>12:00 PM - 12:00 AM</p>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 10, letterSpacing: '0.1em' }}>FRIDAY - SATURDAY</p>
                <p style={{ color: 'var(--blue-accent)', fontWeight: 600, fontSize: '1.1rem' }}>12:00 PM - 01:00 AM</p>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 10, letterSpacing: '0.1em' }}>SUNDAY</p>
                <p style={{ color: 'var(--blue-accent)', fontWeight: 600, fontSize: '1.1rem' }}>12:00 PM - 11:00 PM</p>
              </div>
            </div>
         </div>
      </section>

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

      <style jsx global>{`
        @media (max-width: 900px) {
          .mobile-stack { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </main>
  );
}
