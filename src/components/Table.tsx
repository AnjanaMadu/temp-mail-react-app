import { useEffect, useState } from "react";

interface TableProps {
  mail: string;
}

interface eMail {
  id: string;
  from: string;
  to: string;
  cc: null;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: Date;
  attachments: any[];
}


const Table = ({ mail }: TableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTxt, setModalTxt] = useState("Loading...");
  const [modalTitle, setModalTitle] = useState("");

  const [isBtnLoading, setBtnIsLoading] = useState(false);

  const [mails, setMails] = useState<eMail[]>([]);

  const handleMailClick = (id: string, title: string) => {
    fetch(`/api/message?id=${id}`)
      .then((res) => res.text())
      .then((data) => {
        setModalTxt(data);
      });
    setModalTitle(title);
    setShowModal(true);
  };

  const handleReloadClick = () => {
    setBtnIsLoading(true);
    fetch(`/api/messages?email=${mail}`)
      .then((res) => res.json())
      .then((data) => {
        setMails(data);
        setBtnIsLoading(false);
      });
  };

  useEffect(() => {
    fetch(`/api/messages?email=${mail}`)
      .then((res) => res.json())
      .then((data) => {
        setMails(data);
      });
  }, []);

  const tableRows = mails.map((mail) => {
    return (
      <tr key={mail.id}>
        <td>
          <a href="#" onClick={() => handleMailClick(mail.id, mail.subject)}>
            {mail.subject}
          </a>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>
              Received emails
              <button
                className={`button is-link is-outlined is-small ${
                  isBtnLoading ? "is-loading" : ""
                }`}
                style={{ marginLeft: "1rem" }}
                onClick={handleReloadClick}
                disabled={isBtnLoading}
              >
                Reload
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 ? (
            tableRows
          ) : (
            <tr>
              <td>No emails received</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setShowModal(false)}
            ></button>
          </header>
          <section className="modal-card-body">{modalTxt}</section>
          <footer className="modal-card-foot">
            <button className="button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Table;
