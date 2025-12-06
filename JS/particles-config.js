/**
 * Minimalist Geometric Lines Background - Professional Cursor Interaction
 * Softer, more subtle particle effects
 */
const particlesConfig = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                area: 1000
            }
        },
        color: {
            value: ["#C0C0C0", "#909090", "#707070"]
        },
        shape: {
            type: ["circle", "edge"]
        },
        opacity: {
            value: 0.4,
            random: true,
            animation: {
                enable: true,
                speed: 0.3,
                minimumValue: 0.2,
                sync: false
            }
        },
        size: {
            value: { min: 1, max: 2.5 },
            random: true
        },
        links: {
            enable: true,
            distance: 150,
            color: "#A0A0A0",
            opacity: 0.25,
            width: 1.5
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "bounce"
            }
        }
    },
    interactivity: {
        detectsOn: "window",
        events: {
            onHover: {
                enable: true,
                mode: ["grab", "bubble"]
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 0.8,
                    color: "#E8E8E8"
                }
            },
            bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 150,
                duration: 0.4
            }
        }
    },
    detectRetina: true,
    background: {
        color: "transparent"
    }
};

function loadParticles(elementId) {
    if (window.tsParticles) {
        tsParticles.load(elementId, particlesConfig);
    } else {
        console.error("tsParticles not loaded");
    }
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadParticles('tsparticles'));
} else {
    loadParticles('tsparticles');
}
