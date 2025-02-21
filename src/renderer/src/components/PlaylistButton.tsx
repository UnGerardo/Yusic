import styled from "styled-components"
import PlaylistMenu from "./PlaylistMenu";
import { useEffect, useRef, useState } from "react";

const PlaylistButton = ({ width, height, trackId, className }: { width: number, height: number, trackId: number, className?: string }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const $playlistMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closePlaylistMenu = (e: MouseEvent): void => {
      e.stopPropagation();
      const $playlistMenu = $playlistMenuRef.current as unknown as HTMLElement;
      if ($playlistMenu && !$playlistMenu.contains(e.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener('mousedown', closePlaylistMenu);
    return () => {
      document.removeEventListener('mousedown', closePlaylistMenu);
    }
  }, []);

  return (
    <Container className={className} onClick={(e) => {
      e.stopPropagation();
      setMenuIsOpen((prev) => !prev);
    }}>
      <StyledSVG viewBox="0 0 31 31" width={width} height={height}>
        <rect x="14" y="8" width="3" height="15"/>
        <rect x="14" y="8" width="3" height="15" transform="translate(0 31) rotate(-90)"/>
        <path d="M15.5,0C6.94,0,0,6.94,0,15.5s6.94,15.5,15.5,15.5,15.5-6.94,15.5-15.5S24.06,0,15.5,0ZM15.5,28.5c-7.18,0-13-5.82-13-13S8.32,2.5,15.5,2.5s13,5.82,13,13-5.82,13-13,13Z"/>
      </StyledSVG>
      {menuIsOpen && <PlaylistMenu inputRef={$playlistMenuRef} trackId={trackId} />}
    </Container>
  );
}

export default PlaylistButton;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
`;

const StyledSVG = styled.svg`
  --base-color: gray;
  --brighter-color: white;
  --darker-color: #666;
  fill: var(--base-color);

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;