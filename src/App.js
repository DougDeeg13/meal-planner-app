import React, { useState } from 'react';
import { extractRecipe } from './recipeAPI';

function App() {
  const [recipeUrlInput, setRecipeUrlInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddRecipe = async () => {
    if (!recipeUrlInput) {
      window.alert('Please enter a recipe URL.');
      return;
    }
    setIsLoading(true);
    try {
      const recipe = await extractRecipe(recipeUrlInput);
      const recipeWithUrl = { ...recipe, url: recipeUrlInput };
      setRecipes((prev) => [recipeWithUrl, ...prev]);
      setRecipeUrlInput('');
    } catch (err) {
      window.alert('Failed to fetch recipe. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
      color: '#e5e7eb',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '48px 16px',
      boxSizing: 'border-box',
    },
    container: {
      width: '100%',
      maxWidth: 1100,
      padding: 24,
      boxSizing: 'border-box',
    },
    headerCard: {
      background: 'rgba(17, 24, 39, 0.7)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: 24,
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      backdropFilter: 'blur(6px)',
    },
    title: {
      margin: 0,
      fontSize: 28,
      letterSpacing: 0.2,
      fontWeight: 700,
      color: '#f9fafb',
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 0,
      color: '#9ca3af',
      fontSize: 14,
      lineHeight: 1.6,
    },
    inputRow: {
      display: 'flex',
      gap: 12,
      marginTop: 20,
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      minWidth: 220,
      padding: '12px 14px',
      borderRadius: 10,
      border: '1px solid #374151',
      background: '#0b1220',
      color: '#e5e7eb',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    },
    button: {
      padding: '12px 18px',
      borderRadius: 10,
      border: '1px solid transparent',
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      color: '#0b1220',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'transform 0.08s ease, box-shadow 0.2s ease',
      boxShadow: '0 8px 18px rgba(34, 197, 94, 0.35)',
      whiteSpace: 'nowrap',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    gridSection: {
      marginTop: 24,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: 16,
    },
    card: {
      background: 'rgba(17, 24, 39, 0.75)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
      display: 'flex',
      flexDirection: 'column',
    },
    cardImageWrap: {
      position: 'relative',
      width: '100%',
      paddingBottom: '62%',
      overflow: 'hidden',
      background: '#111827',
    },
    cardImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'saturate(1.05)',
    },
    cardBody: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    },
    cardTitle: {
      margin: 0,
      color: '#f3f4f6',
      fontSize: 16,
      fontWeight: 700,
    },
    cardMeta: {
      margin: 0,
      color: '#9ca3af',
      fontSize: 13,
    },
    detailsButton: {
      marginTop: 10,
      alignSelf: 'flex-start',
      padding: '10px 14px',
      borderRadius: 8,
      border: '1px solid #374151',
      background: '#0b1220',
      color: '#e5e7eb',
      cursor: 'pointer',
      transition: 'border-color 0.15s ease, background 0.15s ease',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: 13,
    },
    empty: {
      marginTop: 24,
      color: '#9ca3af',
      fontSize: 14,
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerCard}>
          <h1 style={styles.title}>My Meal Planner</h1>
          <p style={styles.subtitle}>Paste a recipe URL below to add it to your planner. For now, clicking Add Recipe will insert a placeholder card.</p>
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              type="url"
              placeholder="https://example.com/your-favorite-recipe"
              value={recipeUrlInput}
              onChange={(e) => setRecipeUrlInput(e.target.value)}
            />
            <button
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
              onClick={handleAddRecipe}
              aria-label="Add Recipe"
              disabled={isLoading}
            >
              {isLoading ? 'Adding…' : 'Add Recipe'}
            </button>
          </div>
        </div>

        <section style={styles.gridSection}>
          {recipes.length === 0 ? (
            <div style={styles.empty}>No recipes yet. Add one to get started.</div>
          ) : (
            <div style={styles.grid}>
              {recipes.map((recipe) => (
                <article key={recipe.id} style={styles.card}>
                  <div style={styles.cardImageWrap}>
                    <img src={recipe.image} alt={recipe.title} style={styles.cardImage} />
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{recipe.title}</h3>
                    <p style={styles.cardMeta}>Servings: {recipe.servings ?? '—'}</p>
                    <a
                      style={styles.detailsButton}
                      href={recipe.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Details
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
