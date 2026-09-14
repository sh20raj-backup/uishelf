# Security Policy

The UIShelf maintainers take the security of our ecosystem, developer workstations, and installed code seriously. As a tool that downloads and installs React components into user codebases, security and provenance are first-class architectural concerns.

---

## 🛡️ Supported Versions

We actively provide security patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1.0 | :x:                |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in UIShelf (including `@uishelf/*` packages or CLI):

**Please DO NOT report security issues via public GitHub Issues or Discussions.**

Instead, please report security vulnerabilities directly and confidentially to:
- **Email**: [sh20raj@gmail.com](mailto:sh20raj@gmail.com)
- **Subject**: `[SECURITY] Vulnerability in UIShelf - <Brief Description>`

### What to Include
To help us triage and resolve the issue quickly, please include:
1. Description of the vulnerability and its potential impact.
2. Step-by-step reproduction instructions or a minimal Proof of Concept (PoC).
3. The specific package or CLI version affected.
4. Any proposed remediations or patches, if available.

### Response Timeframe
- **Initial Acknowledgement**: Within 48 hours.
- **Triage & Assessment**: Within 5 business days.
- **Fix & Disclosure**: We will coordinate with you on a patch timeline and public release advisory.

---

## 🔒 Security Architecture in UIShelf

UIShelf incorporates multi-layered defense mechanisms by design:

1. **Path Traversal Guards**: Target paths are strictly resolved within the current project workspace root. Components cannot write to parent or arbitrary directories.
2. **AST Safety Checks**: The `@uishelf/security` module parses incoming component source code with Babel/TypeScript AST scanners before writing to disk, detecting prohibited expressions such as:
   - `eval(...)`
   - `Function(...)` constructor calls
   - Direct execution of `child_process` (`exec`, `spawn`, `fork`)
   - Obfuscated network exfiltration hooks
3. **Cryptographic Integrity**: All installed files are hashed with SHA-256 and committed into `uishelf.lock`. Running `uishelf verify` verifies that local files match their expected cryptographic digests.
4. **Secret Redaction**: Credentials stored in `~/.uishelf/credentials.json` are automatically redacted from error stacks and verbose logs.

Thank you for helping keep UIShelf and the developer community secure!
