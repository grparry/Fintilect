import Parser = require('web-tree-sitter');
import logger from '@/utils/logger';

export class DocumentationParser {
  public static getDocumentation(node: Parser.SyntaxNode): string {
    // Find documentation comment by searching through previous siblings
    let currentNode: Parser.SyntaxNode | null = node;
    
    logger.debug('Getting documentation for node:', {
      nodeType: node.type,
      nodeText: node.text
    });

    // Helper function to collect XML comment nodes
    const collectCommentNodes = (startNode: Parser.SyntaxNode): Parser.SyntaxNode[] => {
      const comments: Parser.SyntaxNode[] = [];
      let current = startNode;
      
      // Look backwards until we find a non-comment node
      while (current && current.type === 'comment' && current.text.startsWith('///')) {
        comments.unshift(current); // Add to front to maintain order
        current = current.previousNamedSibling;
      }
      
      return comments;
    };
    
    // Helper function to extract content from XML documentation
    const extractContent = (commentNodes: Parser.SyntaxNode[]): string => {
      logger.debug('Extracting content from comment nodes:', commentNodes.map(n => n.text));
      
      // Join all comment lines and clean them up
      const lines = commentNodes
        .map(node => node.text)
        .join('\n')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.replace(/^\/\/\/ ?/, ''))  // Remove /// prefix
        .filter(line => line.length > 0);  // Filter out empty lines

      logger.debug('Cleaned lines:', lines);

      // Join all lines
      const fullText = lines.join(' ');
      logger.debug('Full text:', { fullText });

      // First try to find content between summary tags
      const summaryMatch = fullText.match(/<summary>\s*(.*?)\s*<\/summary>/s);
      if (summaryMatch) {
        logger.debug('Found summary match:', { match: summaryMatch[1] });
        
        // Clean up the extracted text
        const cleaned = summaryMatch[1]
          .replace(/<\/?[^>]+(>|$)/g, '') // Remove any nested XML tags
          .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
          .trim();
          
        logger.debug('Cleaned summary:', { cleaned });
        return cleaned;
      }

      logger.debug('No summary tags found, extracting raw text');

      // If no summary tags found, try to extract any text content
      const cleaned = lines
        .map(line => line.replace(/<\/?[^>]+(>|$)/g, '')) // Remove all XML tags
        .filter(line => line.length > 0)
        .join(' ')
        .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
        .trim();
        
      logger.debug('Cleaned raw text:', { cleaned });
      return cleaned;
    };

    // First try to find documentation directly in the property declaration
    if (currentNode.type === 'property_declaration') {
      logger.debug('Searching property declaration for documentation');
      
      // Look for documentation in previous siblings first
      let docNode = currentNode.previousNamedSibling;
      while (docNode) {
        logger.debug('Checking previous sibling:', {
          type: docNode.type,
          text: docNode.text
        });
        
        if (docNode.type === 'comment' && docNode.text.startsWith('///')) {
          const commentNodes = collectCommentNodes(docNode);
          if (commentNodes.length > 0) {
            logger.debug('Found documentation comments in previous siblings');
            return extractContent(commentNodes);
          }
        }
        docNode = docNode.previousNamedSibling;
      }

      // If not found in siblings, look in the parent's children
      if (currentNode.parent) {
        logger.debug('Searching parent node children');
        for (let i = 0; i < currentNode.parent.children.length; i++) {
          const child = currentNode.parent.children[i];
          logger.debug('Checking parent child:', {
            type: child.type,
            text: child.text,
            startRow: child.startPosition.row,
            nodeStartRow: currentNode.startPosition.row
          });
          
          if (child.type === 'comment' && child.text.startsWith('///') && 
              child.startPosition.row < currentNode.startPosition.row) {
            const commentNodes = collectCommentNodes(child);
            if (commentNodes.length > 0) {
              logger.debug('Found documentation comments in parent children');
              return extractContent(commentNodes);
            }
          }
        }
      }
    }

    // Then look through previous siblings
    while (currentNode) {
      logger.debug('Checking node:', {
        type: currentNode.type,
        text: currentNode.text
      });
      
      if (currentNode.type === 'comment' && currentNode.text.startsWith('///')) {
        const commentNodes = collectCommentNodes(currentNode);
        if (commentNodes.length > 0) {
          logger.debug('Found documentation comments');
          return extractContent(commentNodes);
        }
      }
      currentNode = currentNode.previousNamedSibling;
    }

    logger.debug('No documentation found');
    return '';
  }
}
