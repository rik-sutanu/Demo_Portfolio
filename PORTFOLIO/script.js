/**
 * Sutanu Ghosh Portfolio - script.js
 * Interactivity & 3D Math Logic
 * 
 * This script calculates the cursor's location relative to the viewport's center point
 * and applies a rotation matrix to all 3D tilt targets to produce a modern holographic depth effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Capture the elements marked for 3D tilt manipulation
    const tiltElements = document.querySelectorAll('.tilt-target');

    // Maximum rotation angle in degrees
    const MAX_TILT_ANGLE = 15; 

    /**
     * Mouse Move Event Listener
     * Track mouse position across the screen and apply rotateX() and rotateY() transforms
     */
    document.addEventListener('mousemove', (e) => {
        // Calculate the center of the current browser viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate cursor position offsets relative to the center coordinate
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Normalize offsets to a range between -1 and 1
        // (offset / half-width) gives us a decimal representing percentage of screen distance from center
        const normalizedX = offsetX / centerX;
        const normalizedY = offsetY / centerY;

        /**
         * 3D Rotation Calculation:
         * - rotateX controls rotation around the horizontal X-axis (tilting up and down).
         *   Moving the cursor DOWN (positive normalizedY) should tilt the top of the card AWAY
         *   and the bottom TOWARDS the user. Hence we multiply by negative MAX_TILT_ANGLE.
         * - rotateY controls rotation around the vertical Y-axis (tilting left and right).
         *   Moving the cursor RIGHT (positive normalizedX) should tilt the left side AWAY
         *   and the right side TOWARDS the user. Hence we multiply by positive MAX_TILT_ANGLE.
         */
        const rotateX = -normalizedY * MAX_TILT_ANGLE;
        const rotateY = normalizedX * MAX_TILT_ANGLE;

        // Loop through all elements marked with the '.tilt-target' class
        tiltElements.forEach(element => {
            // Apply CSS transforms dynamically with a smooth perspective layer
            // perspective(1000px) creates depth. rotateX & rotateY align orientation to mouse.
            // translateZ lifts internal layers slightly when 3D transform is active.
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
    });

    /**
     * Mouse Leave Event Listener
     * Snaps elements back to their default position (0 degrees) when cursor leaves the window bounds
     */
    document.body.addEventListener('mouseleave', () => {
        tiltElements.forEach(element => {
            // Restore default transform state with transitions defined in CSS for smooth reset
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    // 2. UX BONUS: Lightbox Modal for Credential Zoom
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const certWrappers = document.querySelectorAll('.certificate-image-wrapper');

    certWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
        });
    });

    // Close lightbox on clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close lightbox on clicking anywhere outside the image container
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Log confirmation that system script is fully operational
    console.log("SYSTEM UPDATE: Monospace UI modules compiled. 3D mouse trackers active.");
});
